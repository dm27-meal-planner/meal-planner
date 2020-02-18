require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');
const massive = require('massive');
const {getUser, registerUser, loginUser, logoutUser, registerFirebase, loginFirebase} = require('./controllers/usercontroller');
const {getUserMeals, addMeal, editMeal, deleteMeal, changeFollowedPlan, getNutrition, searchForRecipe, searchByCategory, autoCompleteTerm, searchMeal, mealNutrition, mealAutoComplete} = require('./controllers/mealplancontroller');
const {getMostLikedRecipe, getRecentRecipe, getUserRecipe, getRecipeById, addRecipe, deleteRecipe, editRecipe, getRecipeByQuery} = require('./controllers/recipecontroller');
const {getUserFridge, addItem, editItem, deleteItem, emptyFridge} = require('./controllers/fridgecontroller');
const {getUserGroceryList, addItemToList, editGroceryList, deleteGroceryItem, listToFridge} = require('./controllers/grocerylistcontroller');
const {searchIngredient, addIngredient, getIngredientPrice} = require('./controllers/ingredientsController')


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

//user endpoints

app.post('/api/ingredient/search', searchIngredient)
app.post('/api/ingredient', addIngredient )
app.post('/api/ingredient/price', getIngredientPrice)

app.get('/user/getuser', getUser);
app.post('/user/registeruser', registerUser);
app.post('/user/login', loginUser);
app.post('/user/logout', logoutUser);
app.post('/firebase/register', registerFirebase);
app.post('/firebase/login', loginFirebase);

//mealplan endpoints
//momentjs can format weeks into numbers
app.get('/api/mealplan/search', searchForRecipe)
app.get('/api/search/category', searchByCategory)
app.get(`/api/mealplan/:user_id`, getUserMeals);
app.post('/api/mealplan/:user_id', addMeal);
app.put('/api/mealplan/:meal_id', editMeal);
app.delete('/api/mealplan/:meal_id', deleteMeal);
app.put('/api/mealplan/isfollowed/:meal_id', changeFollowedPlan)
app.get('/api/mealplan/nutrition/pizza', getNutrition)
app.get('/api/mealplan/search/autocomplete', autoCompleteTerm)
app.get('/api/mealplan/search/meal', searchMeal)
app.get('/api/mealplan/meal/nutrition', mealNutrition)


//recipe endpoints
app.get('/api/recipe/mostliked', getMostLikedRecipe);
app.get('/api/recipe/recentlyadded', getRecentRecipe);
app.get('/api/recipe/userrecipe/:user_id', getUserRecipe);
app.get('/api/recipe/id/:recipe_id', getRecipeById);
app.post('/api/recipe/addrecipe', addRecipe);
app.delete('/api/recipe/:recipe_id', deleteRecipe);
app.put('/api/recipe/editrecipe/:recipe_id', editRecipe);
app.get('/api/recipe/search', getRecipeByQuery);

//fridge endpoints
app.get('/api/fridge/:user_id', getUserFridge);
app.post('/api/fridge/:user_id', addItem);
app.put(`/api/fridgeitem/:user_id`, editItem);
app.delete(`/api/fridgeitem/:user_id`, deleteItem);
app.delete('/api/fridge/:user_id', emptyFridge);

//grocerylist endpoints
app.get('/api/grocerylist/:user_id', getUserGroceryList);
app.post('/api/grocerylist/:user_id', addItemToList);
// app.put(`api/grocerylist/:user_id?item=${item_id}`, editGroceryList);
app.delete(`/api/grocerylist/:user_id`, deleteGroceryItem);

//transfer endpoints
app.post(`/api/transfer/:user_id`, listToFridge);

app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`));