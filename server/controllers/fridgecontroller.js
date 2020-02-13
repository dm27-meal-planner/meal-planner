const getUserFridge = async (req, res) => {
   const {user_id} = req.params;
   const db = req.app.get('db');
   const fridge = await db.fridge.get_fridge(user_id);
   res.status(200).json(fridge);
}

const addItem = async (req, res) => {
   const {user_id} = req.params;
   const {quantity, unit, ingredient_name} = req.body; 
   const db = req.app.get('db');
   const item = await db.fridge.add_fridge_item(quantity, unit, ingredient_name);
   const fridgeItem = await db.fridge.add_item_to_userfridge(user_id, item[0].fridge_item_id);
   res.sendStatus(200);
}

const editItem = async (req, res) => {
   // const {} = req.body;
   const {user_id} = req.params;
   const {item} = req.query;
   const db = req.app.get('db');
   res.status(200).json('OK');
}

const deleteItem = async (req, res) => {
   const {user_id} = req.params;
   const {item} = req.query;
   const db = req.app.get('db');
   res.status(200).json('OK');
}

const emptyFridge = async (req, res) => {
   const {user_id} = req.params;
   const db = req.app.get('db');
   // should return an empty array
   const fridge = await db.fridge.empty_fridge(user_id);
   res.status(200).json(fridge);
}

module.exports = {
   getUserFridge,
   addItem,
   editItem,
   deleteItem,
   emptyFridge
}