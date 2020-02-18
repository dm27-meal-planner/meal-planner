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
   const {date, resourceid, title, image, fromApi} = req.body;
   let {recipe_id} = req.body
   let nutritional_info
   const db = req.app.get('db')

   if(fromApi){

      nutritional_info = await axios.get(`https://api.spoonacular.com/recipes/${recipe_id}/information?includeNutrition=true&apiKey=${SPOON_API_KEY}`)
                  .then(res => JSON.stringify(res.data.nutrition.nutrients))

      recipe_id = `s${recipe_id}`
      
   }

   const results = await db.mealplan.add_meal(user_id, date, nutritional_info, false, resourceid, title, image, recipe_id)

   if (!results[0]){
     return res.status(400).json('Error adding meal to plan')
   }

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

   console.log(results)

   if(!results[0]){
      return res.status(400).json('Meal was not updated')
   }

   res.status(200).json(results)
}

const getNutrition = async (req, res) => {
   const { recipe_id } = req.params
   if (recipe_id.startsWith('s')) {
      const id = recipe_id.slice(1);
      
   }


  let result = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${SPOON_API_KEY}`)
   .then(res => res.data.nutrition )

   res.status(200).json(result)
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

   let result = await axios.get(`https://api.spoonacular.com/recipes/search?query=${searchTerm}&apiKey=${SPOON_API_KEY}&number=10&offset=${pageNumber * 10}`)
               .then(res => res.data)

   if(!result.results.length){
      return res.status(400).json('No Search Results')
   }

   result.results.map(ele => {
      return ele.source = 'api'
   })

   res.status(200).json(result)
}

const searchByCategory = async (req, res) => {
   const { cuisine } = req.query
   const { pageNumber } = req.query

   console.log(pageNumber)

   let results = await axios.get(`https://api.spoonacular.com/recipes/search?cuisine=${cuisine}&apiKey=${SPOON_API_KEY}&number=10&offset=${pageNumber * 10}`)
            .then(res => res.data)

            console.log(results)

   res.status(200).json(results)
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