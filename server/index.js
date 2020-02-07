require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');
const massive = require('massive');

const ing = require('./controllers/ingredientsController')

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

// allows use of .json packages
app.use(express.json());

// user session
app.use(session({
   secret: SESSION_SECRET,
   resave: false,
   saveUninitialized: true,
   cookie: {
      //one week
      maxAge: 1000 * 60 * 60 * 24 * 7
   }
}))

massive(CONNECTION_STRING).then(db => {
   app.set('db', db);
   console.log('Connected to database');
})

//ingredient endpoints
app.post('/api/ingredient', ing.searchIngredient)
app.post('/api/ingredient', )

//user endpoints
// app.get('user/getuser', getUser);
// app.post('user/registeruser', registerUser);
// app.post('user/login', loginUser);

//mealplan endpoints
//momentjs can format weeks into numbers
// app.get(`api/mealplan/:usre_id?week=${weeknumber}`, getUserMeals);
// app.post('api/mealplan/:user_id', addMeal);
// app.put('api/mealplan/:meal_id', editMeal);
// app.delete('api/mealplan/:meal_id', deleteMeal);

//recipe endpoints
// app.get('api/recipe/mostliked', getMostLikedRecipe);
// app.get('api/recipe/recentlyadded', getRecentRecipe);
// app.get('api/recipe/userrecipe/:user_id', getUserRecipe);
// app.get('api/recipe/:recipe_id', getRecipeById);
// app.post('api/recipe/addrecipe', addRecipe);
// app.delete('api/recipe/:recipe_id', deleteRecipe);
// app.put('api/recipe/editrecipe/:recipe_id', editRecipe);
// app.get(`api/recipe/search?${searchinfohere}`, getRecipeByQuery);

//fridge endpoints
// app.get('api/fridge/:user_id', getUserFridge);
// app.post('api/fridge/:user_id', addItem);
// app.put(`api/fridge/:user_id?item=${item_id}`, editItem);
// app.delete(`api/fridge/:user_id?item=${item_id}`, deleteItem);

//grocerylist endpoints
// app.get('api/grocerylist/:user_id', getUserGroceryList);
// app.post('api/grocerylist/:user_id', addItemToList);
// app.put('api/grocerylist/:user_id', editGroceryList);
// app.delete(`api/grocerylist/:user_id?item=${item_id}`, deleteGroceryItem);

app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`));