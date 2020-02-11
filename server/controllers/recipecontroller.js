const axios = require('axios');
const { SPOON_API_KEY } = process.env

// only get information from spoonacular since review system is not online yet.
const getMostLikedRecipe = async (req, res) => {
   const condition = `apiKey=${SPOON_API_KEY}&type=main%20course&sort=meta-score&sortDirection=desc&number=5&addRecipeInformation=true`
   await axios.get(`https://api.spoonacular.com/recipes/complexSearch?${condition}`)
      .then(response => {         
         result = response.data.results.map((r)=>{
            return {
               recipe_id: r.id,
               recipe_img: r.image,
               recipe_name: r.title,
               recipe_source: 'spoonacular',
               recipe_author: r.creditsText,
               recipe_time: r.readyInMinutes,
               recipe_review: r.spoonacularScore/20,
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
   const { name } = req.query;
   res.status(200).json('OK');
}

// recipe id start from s: spoonacular, m: mealplan
const getRecipeById = async (req, res) => {
   const { recipe_id } = req.params;
   if (recipe_id.startsWith('s')){
      // get spoonacular recipe
      // remove 's' from id.
      const id = recipe_id.slice(1);

   }else{
      // get mealplan recipe
      // remove 'm' from id
      const id = recipe_id.slice(1);

   }
   res.status(200).json('OK');
}

const addRecipe = async (req, res) => {
   // const {} = req.body;
   res.status(200).json('OK');
}

const deleteRecipe = async (req, res) => {
   const { user_id } = req.params;
   res.status(200).json('OK');
}

const editRecipe = async (req, res) => {
   // const {} = req.body;
   const { user_id } = req.params;
   res.status(200).json('OK');
}



module.exports = {
   getMostLikedRecipe,
   getRecentRecipe,
   getUserRecipe,
   getRecipeById,
   addRecipe,
   deleteRecipe,
   editRecipe,
   getRecipeByQuery
}