const getUserGroceryList = async (req, res) => {
   const {user_id} = req.params;
   res.status(200).json('OK');
}

const addItemToList = async (req, res) => {
   // const {} = req.body;
   const {user_id} = req.params;
   res.status(200).json('OK');
}

const editGroceryList = async (req, res) => {
   // const {} = req.body;
   const {item} = req.query;
   const {user_id} = req.params;
   res.status(200).json('OK');
}

const deleteGroceryList = async (req, res) => {
   const {item} = req.query;
   const {user_id} = req.params;
   res.status(200).json('OK');
}

module.exports = {
   getUserGroceryList,
   addItemToList,
   editGroceryList,
   deleteGroceryList
}