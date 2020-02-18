import React from 'react'

class ListItem extends React.Component{
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
        const {name, image, amount, unit, price, i, saveChanges, removeItem} = this.props
        return(
        <li  >
            <div style={{display: 'flex'}}>
                <input type='checkbox'/>
                <p>{name}</p>
                <img src={`https://www.spoonacular.com/cdn/ingredients_100x100/${image}`} alt='ingredient_image'/>
                <p>{`${amount} ${unit} `}</p>
                <p>${(price / 100).toFixed(2)}</p>
                {this.state.editMode ? 
                <div>
                    <input name='amount' placeholder='qty' onChange={this.handleInputChange}/>
                    <button onClick={() => saveChanges(i, this.state.amount)} >Save Changes</button>
                </div> : null}
                <button onClick={() => this.setState({editMode: !this.state.editMode})}>✏</button>
                <button onClick={() => removeItem(i)}>❌</button>
            </div>
        </li>
        )
    }
}

export default ListItem