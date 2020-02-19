import React, {Component} from 'react';
import moment from 'moment'

class FridgeItem extends Component {
   constructor() {
      super();

      this.state = {
         editing: false,
         quantity: ''
      }
   }

   componentDidMount = () => {
      this.setState({quantity: this.props.element.quantity});
   }

   handleInputChange = e => {
      this.setState({[e.target.name]: e.target.value});
   }

   render() {
      let message = '';
      const {element, deleteItem} = this.props;
      const {editing} = this.state;
      if (editing) {message = 'Done'} else {message = 'Edit'}
      return (
         <tr className="fridgeitem">
            <th>
               <img src={element.imageurl} alt={element.ingredient_name} />
               <span>{element.ingredient_name} 
               {editing ? <button onClick={() => deleteItem(element.fridge_item_id)}>Remove</button> : null}</span>
            </th>
            <th>
               <span>{moment(element.date_added).fromNow()} </span>   
            </th>
            <th>
               {editing ? <> <input type='number' name='quantity' min='1' value={this.state.quantity} onChange={this.handleInputChange} />
               <span>{element.unit} </span>
               </>: <>
               <span>{element.quantity}</span>
               <span>{element.unit} </span></>}
               <button onClick={() => this.setState({editing: !editing})}>{message}</button>
            </th>
         </tr>
      )
   }
}

export default FridgeItem