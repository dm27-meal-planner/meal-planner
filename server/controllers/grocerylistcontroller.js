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