const getMostLikedRecipe = async (req, res) => {
   res.status(200).json('OK');
}

const getRecentRecipe = async (req, res) => {
   res.status(200).json('OK');
}

const getUserRecipe = async (req, res) => {
   const {user_id} = req.params;
   res.status(200).json('OK');
}

const getRecipeById = async (req, res) => {
   const {recipe_id} = req.params;
   res.status(200).json('OK');
}

const addRecipe = async (req, res) => {
   // const {} = req.body;
   res.status(200).json('OK');
}

const deleteRecipe = async (req, res) => {
   const {user_id} = req.params;
   res.status(200).json('OK');
}

const editRecipe = async (req, res) => {
   // const {} = req.body;
   const {user_id} = req.params;
   res.status(200).json('OK');
}

const getRecipeByQuery = async (req, res) => {
   const {} = req.query;
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