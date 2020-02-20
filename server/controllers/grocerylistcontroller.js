const getUserGroceryList = async (req, res) => {
   const {user_id} = req.params;
   const db = req.app.get('db');
   const list = await db.grocerylist.get_grocerylist(user_id);
   res.status(200).json(list);
}

const addItemToList = async (req, res) => {
   const {user_id} = req.params;
   const db = req.app.get('db');
   const userGroceryList = await req.body.map(element => {
      // price is given in cents 
      element.price = (element.price / 100).toFixed(2);
      // image link; user can specify image dimensions in x by y right before image
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
   const {mealplan_id, list_item_id} = req.query

   const db = req.app.get('db')

   if(mealplan_id){
     const result = await db.list_items.delete_item_by_meal(user_id, mealplan_id)
     return  res.status(200).json(result);
   } else if(list_item_id) {
     const result = await db.list_items.delete_item_by_id(user_id, list_item_id)
     return  res.status(200).json(result);
   } else {
      return res.status(400).json('Error deleting list items.')
   }
}

const listToFridge = async (req, res) => {
   const {user_id} = req.params;
   const db = req.app.get('db');
   // should be whatever is left
   const transferDone = await req.body.map(element => {
      db.grocerylist.transfer_to_fridge(element.quantity, element.unit, user_id, element.name, element.imageurl, element.spoon_id, element.list_item_id, element.mealplan_id);
   })
   const remainList = await db.grocerylist.get_grocerylist(user_id);
   res.status(200).json(remainList);
}

module.exports = {
   getUserGroceryList,
   addItemToList,
   editGroceryList,
   deleteGroceryItem,
   listToFridge
}