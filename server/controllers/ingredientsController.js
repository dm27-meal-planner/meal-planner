const axios = require('axios')
const {SPOON_API_KEY} = process.env

module.exports = {
    searchIngredient:  async(req, res) => {

        const db = req.app.get('db')

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

        const { ingredientId } = req.body

        const result = await axios.get(`https://api.spoonacular.com/food/ingredients/${ingredientId}/information`)
            .then(res => res.data)

            if(!result[0]){
                res.status(400).json('Ingredient not found')
            }

            res.status(200).json(result[0])
    }
}