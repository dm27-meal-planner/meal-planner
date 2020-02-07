const getUserMeals = async (req, res) => {
   const {week} = req.query;
   const {user_id} = req.params;
   res.status(200).json('OK');
}

const addMeal = async (req, res) => {
   // const {} = req.body;
   const {user_id} = req.params;
   res.status(200).json('OK');
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