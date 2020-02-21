import React from 'react';
import './stylesheet/IngredientSearchCard.scss';

class IngredientSearchCard extends React.Component{

    constructor(){
        super();
        this.state = {
            amount: 0,
            unit: ''
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
            <li className='IngredientSearchCard-wrapper'>
                <img src={`https://www.spoonacular.com/cdn/ingredients_100x100/${image}`} alt='ingredient' />
                {/* <div> */}
                    <input type='number' min='0' name='amount' onChange={this.handleInputChange}/>
                    <select name='unit' onChange={this.handleInputChange}>
                        <option value={null}>Select unit</option>
                        {possibleUnits.map((ele, i) => <option value={ele} key={i} >{ele}</option>)}
                    </select>
                    <span>{name}</span>
                    {/* disabled means the button is disabled if the condition is met */}
                    <button onClick={() => {
                        addToList({name: name, 
                            amount: this.state.amount, 
                            unit: this.state.unit, 
                            spoon_id:this.props.id, 
                            id: null})
                        }} 
                        disabled={!this.state.amount || !this.state.unit} >Add</button>
                {/* </div> */}
            </li>
        )
    }
}

export default IngredientSearchCard