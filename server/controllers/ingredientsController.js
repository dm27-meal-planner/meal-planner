const axios = require('axios')
const {SPOON_API_KEY} = process.env

// looks a little difference since we are interacting with the API

module.exports = {
    searchIngredient:  async(req, res) => {

        const { searchPhrase } = req.body
        
        let result;
        
         await axios.get(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${searchPhrase}&apiKey=${SPOON_API_KEY}&metaInformation=true`)
            .then(res => result = res.data)
            .catch(err => res.status(400).json(err.response.data.message))

            if(result.length === 0){
                res.status(400).json('No results were found')
            }

            res.status(200).json(result)
    },

    // search both source ingredients.
    searchBothIngredient:  async(req, res) => {
        const name  = `%${req.body.name}%`
        const db = req.app.get('db');
        const localIngredient = await db.ingredients.get_local_ingredient(name)
        res.status(200).json(localIngredient);

    },

    getIngredientPrice: async(req ,res) => {
        const { id, amount, unit } = req.body
        
        const result = await axios.get(`https://api.spoonacular.com/food/ingredients/${id}/information?amount=${amount}&unit=${unit}&apiKey=${SPOON_API_KEY}`)
            .then(res => res.data)

            if(result.length === 0){
                res.status(400).json('Ingredient not found')
            }

            res.status(200).json(result.estimatedCost.value)
    },

    addIngredient:  async(req, res) => {
        const db = req.app.get('db')

        const { ingredientId, ingredientName } = req.body

        const ingredientFound = await db.ingredients.get_ingredient_by_name(ingredientName)

        if(!ingredientFound[0]){
            const result = await axios.get(`https://api.spoonacular.com/food/ingredients/${ingredientId}/information?apiKey=${SPOON_API_KEY}&amount=1`)
                .then(res => res.data)
    
                if(!result){
                    res.status(400).json('Ingredient not found')
                }
    
                db.ingredients.add_ingredient(result.name, result.estimatedCost.value, result.nutrition.nutrients)
    
                res.status(200).json(result)
        } else {
            res.status(200).json(ingredientFound)
        }



    }
}