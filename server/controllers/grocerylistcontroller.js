const getUserGroceryList = async (req, res) => {
   const {user_id} = req.params;
   const db = req.app.get('db');
   const list = await db.grocerylist.get_grocerylist(user_id);
   res.status(200).json(list);
}

const addItemToList = async (req, res) => {
   const {user_id} = req.params;
   const db = req.app.get('db');
   console.log(req.body);
   const userGroceryList = await req.body.map(element => {
      // price is given in cents 
      element.price = (element.price / 100).toFixed(2);
      // image link
      element.image = `https://www.spoonacular.com/cdn/ingredients_100x100/${element.image}`
      return db.list_items.add_item(element.amount, element.unit, user_id, element.id, element.price, element.name, element.image)
   })
   res.status(200).json(userGroceryList);
}

const editGroceryList = async (req, res) => {
   // const {} = req.body;
   const {item} = req.query;
   const {user_id} = req.params;
   res.status(200).json('OK');
}

const deleteGroceryItem = async (req, res) => {
   const {user_id} = req.params;
   res.status(200).json('OK');
}

const listToFridge = async (req, res) => {
   const {user_id} = req.params;
   const db = req.app.get('db');
   // should be whatever is left
   const transferDone = await req.body.map(element => {
      db.grocerylist.transfer_to_fridge(element.quantity, element.unit, user_id, element.name, element.imageurl, element.spoon_id, element.list_item_id);
   })
   const remainList = await db.grocerylist.get_grocerylist(user_id);
   res.sendStatus(200).json(remainList);
}

module.exports = {
   getUserGroceryList,
   addItemToList,
   editGroceryList,
   deleteGroceryItem,
   listToFridge
}