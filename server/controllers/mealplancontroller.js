const moment = require('moment')

const getUserMeals = async (req, res) => {
   const {user_id} = req.params;

   const db = req.app.get('db')

   const result = await db.mealplan.get_meals(user_id)

   if(result.length === 0){
      res.status(400).json('User has no meals planned')
   }
   res.status(200).json(result);
}

const addMeal = async (req, res) => {
   const {user_id} = req.params;
   const {recipe_id, meal_start, nutritional_info, meal_type, meal_title} = req.body;
   const db = req.app.get('db')

   const results = await db.mealplan.add_meal(user_id, moment().format(), null, null, 'lunch', 'pizza')

   if (!results[0]){
      res.status(400).json('Error adding meal to plan')
   }

   res.status(200).json(results[0]);
}

const editMeal = async (req, res) => {
   // const {} = req.body;
   const {meal_id} = req.params;
   res.status(200).json('OK');
}

const deleteMeal = async (req, res) => {
   const {meal_id} = req.params;
   res.status(200).json('OK');
}

module.exports = {
   getUserMeals,
   addMeal,
   editMeal,
   deleteMeal
}