const axios = require('axios')
const {SPOON_API_KEY} = process.env

module.exports = {
    searchIngredient:  async(req, res) => {

        const { searchPhrase } = req.body
        
        const result = await axios.get(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${searchPhrase}&apiKey=${SPOON_API_KEY}&metaInformation=true`)
            .then(res => res.data)

            if(result.length === 0){
                res.status(400).json('No results were found')
            }

            res.status(200).json(result)
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