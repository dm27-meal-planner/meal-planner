const getUserGroceryList = async (req, res) => {
   const {user_id} = req.params;
   res.status(200).json('OK');
}

const addItemToList = async (req, res) => {
   // const {list_id} = req.params
   // const {id, amount, unit } = req.body
   
   // const db = req.app.get('db')

   // const result = await db.list_items.add_item(list_id, id, amount, unit)
   // console.log(result)
   // if(!result[0]){
   //    res.status(400).json('Error adding item to list')
   // }


   // res.status(200).json(result)
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