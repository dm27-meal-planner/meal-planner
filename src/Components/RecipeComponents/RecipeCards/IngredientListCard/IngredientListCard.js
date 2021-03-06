import React from 'react'
import './stylesheet/IngredientListCard.scss';

class IngredientListCard extends React.Component{
    constructor(){
        super()
        this.state={
            editMode: false,
            amount: ''
        }
    }

    handleInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }


    render(){
        const {name, amount, unit, i, saveChanges, removeItem} = this.props
        return(
        <li  className='IngredientListCard-wrapper'>
            <div>
                {/* <input type='checkbox'/> */}
                <p>{amount} {unit} {name}</p>
                {/* <img src={`https://www.spoonacular.com/cdn/ingredients_100x100/${image}`} alt='ingredient_image'/> */}
                {this.state.editMode ? 
                <div>
                    <input name='amount' placeholder='qty' onChange={this.handleInputChange}/>
                    <button onClick={() => {
                        saveChanges(i, this.state.amount);
                        this.setState({editMode: !this.state.editMode});
                        } } >Save Changes</button>
                </div> : null}
                <div>
                    <button onClick={() => this.setState({editMode: !this.state.editMode})}>✏</button>
                    <button onClick={() => removeItem(i)}><span role="img">❌</span></button>
                </div>
            </div>
        </li>
        )
    }
}

export default IngredientListCard