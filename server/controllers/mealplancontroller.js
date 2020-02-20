const moment = require('moment')
const {SPOON_API_KEY} = process.env
const axios = require('axios')
const getUserMeals = async (req, res) => {
   const {user_id} = req.params;

   const db = req.app.get('db')

   const result = await db.mealplan.get_meals(user_id)

   if(result.length === 0){
     return res.status(400).json('User has no meals planned')
   }
   res.status(200).json(result);
}

const addMeal = async (req, res) => {
   const {user_id} = req.params;
   const {date, resourceid, title, image, fromApi, household} = req.body;
   let {recipe_id} = req.body
   let nutritional_info = null
   const db = req.app.get('db')

   console.log(req.body)

   let ingredients;
   let directions;
   let total_time;
   let servings

   if(fromApi){



      await axios.get(`https://api.spoonacular.com/recipes/${recipe_id}/information?includeNutrition=true&apiKey=${SPOON_API_KEY}`)
                  .then(res => {
                      nutritional_info = JSON.stringify(res.data.nutrition.nutrients)
                      total_time = res.data.preparationMinutes + res.data.cookingMinutes
                      servings = res.data.servings
                      ingredients = JSON.stringify(res.data.extendedIngredients.map(ele => {

                        return {ingredient_id: ele.id, ingredient_name: ele.name, unit: ele.unit, amount: (+ele.amount/+servings) * household, image: `https://www.spoonacular.com/cdn/ingredients_100x100/${ele.image}`}
                     }))
                      directions = JSON.stringify(res.data.analyzedInstructions[0].steps.map(ele => {
                        return {step: ele.number, instruction: ele.step}
                     }))
                  })
      recipe_id = `s${recipe_id}`

   }else{


      nutritional_info = await db.mealplan.get_nutritional_info(recipe_id)

      nutritional_info = JSON.stringify(nutritional_info[0].nutritional_info)

      recipe_id = `l${recipe_id}`
   }


   
   
   const results = await db.mealplan.add_meal(user_id, date, nutritional_info, false, resourceid, title, image, recipe_id, ingredients, directions, +total_time)
   
   JSON.parse(ingredients).map(async (ele) => {


      let price = await axios.get(`https://api.spoonacular.com/food/ingredients/${ele.ingredient_id}/information?amount=${ele.amount}&unit=${ele.unit}&apiKey=${SPOON_API_KEY}`)
                  .then(res => res.data.estimatedCost.value)

                  console.log(ele.amount)

      await db.list_items.add_item(ele.amount, ele.unit, user_id, ele.ingredient_id, (price / 100).toFixed(2), ele.ingredient_name, ele.image, results[results.length - 1].mealplan_id)

   })

   if (!results[0]){
     return res.status(400).json('Error adding meal to plan')
   }

   // console.log(results)

   res.status(200).json(results);
}

const editMeal = async (req, res) => {
   const {user_id} = req.body
   const { date, followed_plan, resourceid, title} = req.body
   const {meal_id} = req.params;
   const db = req.app.get('db')


   const result = await db.mealplan.edit_meal(date, followed_plan, resourceid, title, meal_id, user_id)

   if (!result[0]){
     return res.status(400).json('Error adding meal to plan')
   }

   res.status(200).json(result);
}

const deleteMeal = async (req, res) => {
   const {meal_id} = req.params;
   const {user_id} = req.query
   const db = req.app.get('db')

   const results = await db.mealplan.delete_meal(meal_id, user_id)

   if(!results[0]){
    return  res.status(400).json('No meals were deleted')
   }

   res.status(200).json(results)
}

const changeFollowedPlan = async(req, res) => {
   const {meal_id} = req.params
   const {followed_plan} = req.body
   const db = req.app.get('db')

   const results = await db.mealplan.change_followed_plan(followed_plan, meal_id)
   if(!results[0]){
      return res.status(400).json('Meal was not updated')
   }

   res.status(200).json(results)
}

const getNutrition = async (req, res) => {
   const { recipe_id } = req.params
   if (recipe_id.startsWith('s')) {
      const id = recipe_id.slice(1);
      
      let result = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${SPOON_API_KEY}`)
      .then(res => res.data.nutrition.nutrients )
      
      res.status(200).json(result.slice(0,9))
   }
}

const autoCompleteTerm = async(req, res) => {
   const { searchTerm } = req.query

   let result = await axios.get(`https://api.spoonacular.com/recipes/autocomplete?query=${searchTerm}&apiKey=${SPOON_API_KEY}&number=20`)
         .then(res => res.data)

   if(!result.length){
      return res.status(400).json('No Search Results')
   }

   res.status(200).json(result)
}

const searchForRecipe = async (req, res) => {
   const { searchTerm } = req.query
   const { pageNumber } = req.query
   
   const db = req.app.get('db')

   let localResults = await db.mealplan.search_for_recipe(`\\m${searchTerm}\\M`)

   if(localResults.length >= (pageNumber + 1) * 10){
      localResults.forEach(ele => ele.source = 'db')
      return res.status(200).json(localResults.slice(pageNumber * 10, pageNumber * 10 + 10))
   }

   if(localResults.length < (pageNumber + 1) * 10 && localResults.length > (pageNumber * 10)){
      let result = await axios.get(`https://api.spoonacular.com/recipes/search?query=${searchTerm}&apiKey=${SPOON_API_KEY}&number=${10 - localResults.length}`)
      .then(res => res.data.results)
      localResults.forEach(ele => ele.source = 'db')
      result.forEach(ele => ele.source = 'api')
      let combinedRes = [...localResults.slice((pageNumber * 10)), ...result]
      return res.status(200).json(combinedRes)
   }

   if(localResults.length > 0 && localResults.length < (pageNumber * 10)){
     let result = await axios.get(`https://api.spoonacular.com/recipes/search?query=${searchTerm}&apiKey=${SPOON_API_KEY}&number=10&offset=${(10 * pageNumber - localResults.length) + 10 * (Math.floor(localResults.length/10))}`)
      .then(res => res.data.results)
      result.forEach(ele => ele.source = 'api')

      return res.status(200).json(result)
   }

   if(!localResults.length){
      let result = await axios.get(`https://api.spoonacular.com/recipes/search?query=${searchTerm}&apiKey=${SPOON_API_KEY}&number=10&offset=${pageNumber * 10}`)
                  .then(res => res.data.results)
                  result.forEach(ele => ele.source = 'api')

      if(!result.length){
        return res.status(400).json('No Results Found.')
      }
         return res.status(200).json(result)
   }
}

const searchByCategory = async (req, res) => {
   const { cuisine } = req.query
   const { pageNumber } = req.query
   
   const db = req.app.get('db')

   let localResults = await db.mealplan.search_by_cuisine(cuisine)

   if(localResults.length >= (pageNumber + 1) * 10){
      localResults.forEach(ele => ele.source = 'db')
      return res.status(200).json(localResults.slice(pageNumber * 10, pageNumber * 10 + 10))
   }

   if(localResults.length < (pageNumber + 1) * 10 && localResults.length > (pageNumber * 10)){
      let result = await axios.get(`https://api.spoonacular.com/recipes/search?cuisine=${cuisine}&apiKey=${SPOON_API_KEY}&number=${10 - localResults.length}`)
      .then(res => res.data.results)
      localResults.forEach(ele => ele.source = 'db')
      result.forEach(ele => ele.source = 'api')
      let combinedRes = [...localResults.slice((pageNumber * 10)), ...result]
      return res.status(200).json(combinedRes)
   }

   if(localResults.length > 0 && localResults.length < (pageNumber * 10)){
     let result = await axios.get(`https://api.spoonacular.com/recipes/search?cuisine=${cuisine}&apiKey=${SPOON_API_KEY}&number=10&offset=${(10 * pageNumber - localResults.length) + 10 * (Math.floor(localResults.length/10))}`)
      .then(res => res.data.results)
      result.forEach(ele => ele.source = 'api')

      return res.status(200).json(result)
   }

   if(!localResults.length){
      let result = await axios.get(`https://api.spoonacular.com/recipes/search?cuisine=${cuisine}&apiKey=${SPOON_API_KEY}&number=10&offset=${pageNumber * 10}`)
                  .then(res => res.data.results)
                  result.forEach(ele => ele.source = 'api')

      if(!result.length){
        return res.status(400).json('No Results Found.')
      }
         return res.status(200).json(result)
   }
}

const searchMeal = async(req, res) => {
   const { searchTerm } = req.query



   let result = await axios.get(`https://api.spoonacular.com/food/menuItems/search?query=${searchTerm}&apiKey=${SPOON_API_KEY}&number=20`)
   .then(res => res.data)

   res.status(200).json(result)
}

const mealNutrition = async (req, res) => {
   const { id } = req.query

   let result = await axios.get(`https://api.spoonacular.com/food/menuItems/${id}?apiKey=${SPOON_API_KEY}`)
         .then(res => res.data.nutrition)

      res.status(200).json(result)
}



module.exports = {
   getUserMeals,
   addMeal,
   editMeal,
   deleteMeal,
   changeFollowedPlan,
   getNutrition,
   searchForRecipe,
   searchByCategory,
   autoCompleteTerm,
   searchMeal,
   mealNutrition
      
}