const axios = require('axios');
const qs = require('querystring');

const { SPOON_API_KEY } = process.env

// only get information from spoonacular since review system is not online yet.
const getMostLikedRecipe = async (req, res) => {
   const condition = `apiKey=${SPOON_API_KEY}&type=main+course&sort=meta-score&sortDirection=desc&number=5&addRecipeInformation=true`
   await axios.get(`https://api.spoonacular.com/recipes/complexSearch?${condition}`)
      .then(response => {
         result = response.data.results.map((r) => {
            return {
               recipe_id: r.id,
               recipe_img: r.image,
               recipe_name: r.title,
               recipe_source: 'spoonacular',
               recipe_author: r.creditsText,
               recipe_time: r.readyInMinutes,
               recipe_review: r.spoonacularScore / 20,
            }
         });
         res.status(200).json(result);
      })
      .catch(err => res.status(400).json(err.response.data.message))
}

// only from database since no timestamp info from spoonacular
const getRecentRecipe = async (req, res) => {
   const db = req.app.get('db');
   const recentRecipe = await db.recipes.get_recent_recipes()
   res.status(200).json(recentRecipe);
}

// only from database since user can only modify their recipe here.
const getUserRecipe = async (req, res) => {
   const { user_id } = req.params;
   // console.log(user_id);
   const db = req.app.get('db');
   const userRecipe = await db.recipes.get_user_recipes(user_id)
   res.status(200).json(userRecipe);
}

const getRecipeByQuery = async (req, res) => {
   // now can only search one ingredient.
   const { name, meal_type, cuisine, ingredient } = req.query;
   const page = req.query.page ? parseInt(req.query.page) : 1;
   // one page shows 10 records
   // start from meal plan database
   if (name) {
      // search from MealPlan database.
      const db = req.app.get('db');
      // console.log('name:', `%${name.replace(' ','%')}%`);

      const mealPlanRecipes = await db.recipes.search_recipes(`%${name.replace(' ', '%')}%`, meal_type ? meal_type : '', cuisine ? cuisine : '', ingredient ? ingredient : '');

      // console.log(mealPlanRecipes);


      let allRecipes = [];
      if (page * 10 <= mealPlanRecipes.length) {
         // only respond mealplan database.
         allRecipes = allRecipes.concat(mealPlanRecipes.slice((page - 1) * 10, page * 10));
      } else {
         // search from Spoonacular database.
         // put conditions together.
         let condition = `apiKey=${SPOON_API_KEY}`;
         condition += `&query=${name}`;
         condition += `&addRecipeInformation=true`;
         condition += `&sort=meta-score`;
         condition += `&sortDirection=desc`;
         if (meal_type) {
            let spoonMealType = '';
            if (meal_type.toLowerCase() === 'breakfast') {
               spoonMealType = 'breakfast';
            } else if (meal_type.toLowerCase() === 'lunch') {
               spoonMealType = 'main%20course';
            } else if (meal_type.toLowerCase() === 'dinner') {
               spoonMealType = 'main%20course';
            } else if (meal_type.toLowerCase() === 'snack') {
               spoonMealType = 'snack';
            }
            condition += `&type=${spoonMealType}`;
         }

         if (cuisine) {
            condition += `&cuisine=${cuisine}`;
         }

         if (ingredient) {
            condition += `&includeIngredients=${ingredient}`;
         }


         let number = 10;
         let offset = 0;
         if ((page - 1) * 10 < mealPlanRecipes.length) {
            // mix data
            allRecipes = allRecipes.concat(mealPlanRecipes.slice((page - 1) * 10));
            number = page * 10 - mealPlanRecipes.length;
         } else {
            // only spoonacular data
            offset = (page - 1) * 10 - mealPlanRecipes.length;
         }
         condition += `&number=${number}`;
         condition += `&offset=${offset}`;

         console.log(condition);


         const spoonacularRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?${condition}`)
            .then(response => {
               result = response.data.results.map((r) => {
                  return {
                     recipe_id: r.id,
                     recipe_img: r.image,
                     recipe_name: r.title,
                     recipe_source: 'spoonacular',
                     recipe_author: r.creditsText,
                     recipe_time: r.readyInMinutes,
                     recipe_review: r.spoonacularScore / 20,
                  }
               });
               // res.status(200).json(result);
               return result;
            })
            .catch(err => {
               // res.status(400).json(err.response.data.message)
               console.log(err.response.data.message);
               return [];
            })
         // combine two database
         allRecipes = allRecipes.concat(spoonacularRecipes);
         res.status(200).json(allRecipes);
      }
   } else {
      // not entering the name, return error.
      res.status(404).json("Please enter the name!");
   }
   // res.status(200).json('OK');
}

// recipe id start from s: spoonacular, m: mealplan
const getRecipeById = async (req, res) => {
   const { recipe_id } = req.params;
   if (recipe_id.startsWith('s')) {
      // get spoonacular recipe
      // remove 's' from id.
      const id = recipe_id.slice(1);
      let condition = `apiKey=${SPOON_API_KEY}`;
      condition += '&includeNutrition=true';
      axios.get(`https://api.spoonacular.com/recipes/${id}/information?${condition}`)
         .then(response => {
            // console.log(response.data);

            result = {
               recipe_id: response.data.id,
               recipe_img: response.data.image,
               recipe_name: response.data.title,
               recipe_source: 'spoonacular',
               recipe_author: response.data.creditsText,
               recipe_author_id: -1,
               recipe_review: response.data.spoonacularScore / 20,

               recipe_servings: response.data.servings,
               recipe_cuisine: response.data.cuisines,
               recipe_meal_type: response.data.dishTypes,

               recipe_time: response.data.readyInMinutes,
               recipe_prep_time: response.data.preparationMinutes ? response.data.preparationMinutes : 0,
               recipe_cook_time: response.data.cookingMinutes ? response.data.cookingMinutes : response.data.readyInMinutes,

               recipe_description: `From: ${response.data.sourceUrl}`,

               recipe_nutrition: response.data.nutrition.nutrients,

               recipe_ingredients: response.data.extendedIngredients.map(e => {
                  return {
                     id: e.id,
                     amount: e.amount,
                     unit: e.unit,
                     name: e.name
                  }
               }),

               recipe_directions: response.data.instructions,
            }
            res.status(200).json(result);
            // return result;
         })
         .catch(err => {
            console.log(err);

            res.status(400).json(err.response.data.message)
            console.log(err.response.data.message);
            // return [];
         })


   } else {
      // get mealplan recipe
      // remove 'm' from id
      const id = recipe_id.slice(1);
      const db = req.app.get('db');
      const mealRecipe = await db.recipes.get_recipe_by_id(id);
      let result = {
         recipe_id: mealRecipe[0].recipe_id,
         recipe_img: mealRecipe[0].recipe_img,
         recipe_name: mealRecipe[0].recipe_name,
         recipe_source: mealRecipe[0].recipe_source,
         recipe_author: mealRecipe[0].recipe_author,
         recipe_author_id: mealRecipe[0].recipe_author_id,
         recipe_review: mealRecipe[0].recipe_review,

         recipe_servings: mealRecipe[0].recipe_servings,
         recipe_cuisine: mealRecipe[0].recipe_cuisine,
         recipe_meal_type: mealRecipe[0].recipe_meal_type,

         recipe_time: mealRecipe[0].recipe_time,
         recipe_prep_time: mealRecipe[0].recipe_prep_time,
         recipe_cook_time: mealRecipe[0].recipe_cook_time,

         recipe_description: mealRecipe[0].recipe_description,

         recipe_nutrition: mealRecipe[0].recipe_nutrition,

         recipe_directions: mealRecipe[0].recipe_directions,
      }

      const mealRecipeIngredients = await db.recipes.get_recipe_ingredients_by_id(id);

      result.recipe_ingredients = mealRecipeIngredients;

      res.status(200).json(result);
   }
}

const addRecipe = async (req, res) => {
   // console.log(req.body);

   const {
      recipeName,
      recipeImg,

      recipeServings,
      recipeCuisine,
      recipeMealType,

      recipePrepTime,
      recipeCookTime,

      recipeDes,
      recipeNutrition,
      recipeIngredients,
      recipeDirection,

      added_date
   } = req.body;
   // **using middleware instead
   if (!req.session.user) {
      res.status(401).json("Please login!");
      return null;
   }
   // add to recipe table
   const db = req.app.get('db');
   const userRecipe = await db.recipes.add_recipe(
      req.session.user.user_id, recipeName, recipeImg, recipePrepTime, recipeCookTime,
      recipeDirection, recipeMealType, recipeDes, JSON.stringify(recipeNutrition),
      recipeServings, added_date, recipeCuisine
   );
   // get the recipe_id for recipe_ingredient
   const recipeId = userRecipe[0].recipe_id;

   // check each recipe ingredient
   // ingredient: {name, amount, unit, id(recipe_ingredient_id), spoon_id}
   // console.log('recipeIngredients:',recipeIngredients);

   for (let i = 0; i < recipeIngredients.length; i++) {
      // search ingredient database
      let ingredientFound = await db.ingredients.get_ingredient_by_name(recipeIngredients[i].name.toLowerCase());
      let ingredientId;
      // console.log('ingredientFound:', ingredientFound);

      if (!ingredientFound[0]) {
         // if not in database, go to spoon api to get the info
         let spoonObj = {
            ingredientList: recipeIngredients[i].name,
            servings: 1,
            includeNutrition: false,
         }
         // console.log('spoonObj:', spoonObj);
         const config = {
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
            }
         }
         let spoonResult = await axios.post(`https://api.spoonacular.com/recipes/parseIngredients?apiKey=${SPOON_API_KEY}`, qs.stringify(spoonObj), config)
            .then(res => res.data)
            .catch(err => {
               console.log(err.response.data.message);
               return [];
            });
         // console.log('spoonResult: ',spoonResult);

         let addIngredient;
         if (spoonResult[0]) {
            // success, using api info to add into ingredient database            
            addIngredient = await db.ingredients.add_ingredient(
               recipeIngredients[i].name.toLowerCase(),
               null, null, spoonResult[0].id, spoonResult[0].image, true
            );
         } else {
            // fail, insert basic information to ingredient database.
            //  ** for future: if check_api is false, go to api to update the info.(update the check_api part)
            addIngredient = await db.ingredients.add_ingredient(
               recipeIngredients[i].name.toLowerCase(),
               null, null, null, null, false
            );
         }
         ingredientId = addIngredient[0].ingredient_id;
      } else {
         // in database
         ingredientId = ingredientFound[0].ingredient_id;
         // ** for future: if check_api is false, go to api to update the info.
      }
      // now ingredient database has the info, insert into recipe_ingredient.
      db.recipes.add_recipe_ingredient(ingredientId, recipeId, recipeIngredients[i].amount, recipeIngredients[i].unit);
   }
   res.status(200).json(userRecipe);
}

const editRecipe = async (req, res) => {
   // const {} = req.body;
   if (!req.params.recipe_id.startsWith('m')) {
      res.status(400).json('Not legal recipe id!');
      return null;
   }
   const recipeId = req.params.recipe_id.slice(1);
   const {
      recipeName,
      recipeImg,

      recipeServings,
      recipeCuisine,
      recipeMealType,

      recipePrepTime,
      recipeCookTime,

      recipeDes,
      recipeNutrition,
      recipeIngredients,
      recipeDirection,

   } = req.body;
   // **using middleware instead
   if (!req.session.user) {
      res.status(401).json("Please login!");
      return null;
   }

   // check if it's original author:
   const db = req.app.get('db');
   const userRecipe = await db.recipes.get_recipe_by_id(recipeId);
   if (userRecipe) {
      if (userRecipe[0]) {
         if (req.session.user.user_id !== userRecipe[0].recipe_author_id) {
            res.status(401).json("Not authorized!");
            return null;
         }
      } else {
         res.status(401).json("Not authorized!");
         return null;
      }
   } else {
      res.status(401).json("Not authorized!");
      return null;
   }


   // update recipe table
   const updRecipe = await db.recipes.update_recipe(
      recipeName, recipeImg, recipePrepTime, recipeCookTime,
      recipeDirection, recipeMealType, recipeDes, JSON.stringify(recipeNutrition),
      recipeServings, recipeCuisine, recipeId
   );

   // remove all the ingredients and add them again

   await db.recipes.delete_recipe_ingredient(recipeId);

   // check each recipe ingredient
   // ingredient: {name, amount, unit, id(recipe_ingredient_id), spoon_id}
   // console.log('recipeIngredients:',recipeIngredients);

   for (let i = 0; i < recipeIngredients.length; i++) {


      // search ingredient database
      let ingredientFound = await db.ingredients.get_ingredient_by_name(recipeIngredients[i].name.toLowerCase());
      let ingredientId;
      // console.log('ingredientFound:', ingredientFound);

      if (!ingredientFound[0]) {
         // if not in database, go to spoon api to get the info
         let spoonObj = {
            ingredientList: recipeIngredients[i].name,
            servings: 1,
            includeNutrition: false,
         }
         // console.log('spoonObj:', spoonObj);
         const config = {
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
            }
         }
         let spoonResult = await axios.post(`https://api.spoonacular.com/recipes/parseIngredients?apiKey=${SPOON_API_KEY}`, qs.stringify(spoonObj), config)
            .then(res => res.data)
            .catch(err => {
               console.log(err.response.data.message);
               return [];
            });
         // console.log('spoonResult: ',spoonResult);

         let addIngredient;
         if (spoonResult[0]) {
            // success, using api info to add into ingredient database            
            addIngredient = await db.ingredients.add_ingredient(
               recipeIngredients[i].name.toLowerCase(),
               null, null, spoonResult[0].id, spoonResult[0].image, true
            );
         } else {
            // fail, insert basic information to ingredient database.
            //  ** for future: if check_api is false, go to api to update the info.(update the check_api part)
            addIngredient = await db.ingredients.add_ingredient(
               recipeIngredients[i].name.toLowerCase(),
               null, null, null, null, false
            );
         }
         ingredientId = addIngredient[0].ingredient_id;
      } else {
         // in database
         ingredientId = ingredientFound[0].ingredient_id;
         // ** for future: if check_api is false, go to api to update the info.
      }
      // now ingredient database has the info, insert into recipe_ingredient.
      db.recipes.add_recipe_ingredient(ingredientId, recipeId, recipeIngredients[i].amount, recipeIngredients[i].unit);
   }
   res.status(200).json(updRecipe);

}

const deleteRecipe = async (req, res) => {
   
   if (!req.params.recipe_id.startsWith('m')) {
      res.status(400).json('Not legal recipe id!');
      return null;
   }

   const recipe_id = req.params.recipe_id.slice(1);
   const db = req.app.get('db');

   // check if it's original author:
   const userRecipe = await db.recipes.get_recipe_by_id(recipe_id);
   if (userRecipe) {
      if (userRecipe[0]) {
         if (req.session.user.user_id !== userRecipe[0].recipe_author_id) {
            res.status(401).json("Not authorized!");
            return null;
         }
      } else {
         res.status(401).json("Not authorized!");
         return null;
      }
   } else {
      res.status(401).json("Not authorized!");
      return null;
   }
   // delete recipe_ingredients first
   await db.recipes.delete_recipe_ingredient(recipe_id);
   
   // delete recipes second
   const deleteRecipe = await db.recipes.delete_recipe(recipe_id);

   res.status(200).json(deleteRecipe);
}

const getCuisineList = async (req, res) => {
   const db = req.app.get('db');
   const cuisineList = await db.recipes.get_cuisine_list()
   res.status(200).json(cuisineList);
}


module.exports = {
   getMostLikedRecipe,
   getRecentRecipe,
   getUserRecipe,
   getRecipeById,
   addRecipe,
   deleteRecipe,
   editRecipe,
   getRecipeByQuery,
   getCuisineList
}