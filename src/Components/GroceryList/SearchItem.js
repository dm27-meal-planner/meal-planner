import React from 'react'
import './stylesheet/GroceryList.css';


class SearchItem extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    handleInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }

    render(){
        const { name, image, possibleUnits, addToList } = this.props
        return(
            <li className="searchitem">
                <span className="name">
                    <p>{name}</p>
                </span>
                <span className="image-content">
                    <img src={`https://www.spoonacular.com/cdn/ingredients_100x100/${image}`} alt='ingredient_image' />
                </span>
                <span className="user-content">
                    <input type='number' min='0' name='amount' onChange={this.handleInputChange}/>
                    <select name='unit' onChange={this.handleInputChange}>
                        <option value={null}>Select unit</option>
                        {possibleUnits.map((ele, i) => <option value={ele} key={i} >{ele}</option>)}
                    </select>
                    {/* disabled means the button is disabled if the condition is met */}
                    <button onClick={() => addToList({name: name, image: image, amount: this.state.amount, unit: this.state.unit, id:this.props.id })} disabled={!this.state.amount || !this.state.unit} >Add to Grocery List</button>
                </span>
            </li>
        )
    }
}

export default SearchItem