import axios from 'axios'

module.exports = {
    addIngredient:  async(req, res) => {
        const { searchPhrase } = req.body
        
        axios.get('https://api.spoonacular.com/food/ingredients/autocomplete?query=app')

    }
}