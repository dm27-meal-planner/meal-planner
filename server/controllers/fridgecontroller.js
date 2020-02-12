const getUserFridge = async (req, res) => {
   const {user_id} = req.params;
   const db = req.app.get('db');
   const fridge = await db.fridge.get_fridge(user_id);
   console.log(fridge);
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