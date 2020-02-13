const moment = require('moment')

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
   const {recipe_id, date, nutritional_info, resourceid, title} = req.body;
   const db = req.app.get('db')

   const results = await db.mealplan.add_meal(user_id, date, nutritional_info, false, resourceid, title)

   if (!results[0]){
      res.status(400).json('Error adding meal to plan')
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
      res.status(400).json('Error adding meal to plan')
   }

   res.status(200).json(result);
}

const deleteMeal = async (req, res) => {
   const {meal_id} = req.params;
   const {user_id} = req.query
   const db = req.app.get('db')

   const results = await db.mealplan.delete_meal(meal_id, user_id)

   if(!results[0]){
      res.status(400).json('No meals were deleted')
   }

   res.status(200).json(results)
}

module.exports = {
   getUserMeals,
   addMeal,
   editMeal,
   deleteMeal
}