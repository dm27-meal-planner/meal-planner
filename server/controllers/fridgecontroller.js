const getUserFridge = async (req, res) => {
   const {user_id} = req.params;
   res.status(200).json('OK');
}

const addItem = async (req, res) => {
   const {user_id} = req.params;
   res.status(200).json('OK');
}

const editItem = async (req, res) => {
   // const {} = req.body;
   const {user_id} = req.params;
   const {item} = req.query;
   res.status(200).json('OK');
}

const deleteItem = async (req, res) => {
   const {user_id} = req.params;
   const {item} = req.query;
   res.status(200).json('OK');
}

module.exports = {
   getUserFridge,
   addItem,
   editItem,
   deleteItem
}