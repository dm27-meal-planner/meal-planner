import React, {Component} from 'react';
import {listToFridge} from '../../redux/reducers/grocerylistReducer';
import {connect} from 'react-redux';

class ShoppingList extends Component {
   constructor() {
      super();
      this.state = {
         shoppingList: []
      }
   }

   componentDidMount = async () => {
      await this.setState({shoppingList: this.props.groceryList});
      console.log(this.state.shoppingList);
   }

   // The user should be able to check boxes in the shopping list so they can add items
   // that they actually shopped for
   // To-do before bed 2/14: Alter the local list by clicking them. Once they are done shopping, add the selected items to the fridge!
   transferToFridge = (list) => {
      console.log('should work');
      // this.props.listToFridge(this.props.user_id, list);
   } 


   render() {
      return(
         <>
            {this.state.shoppingList.map((element, index) => {
               return (
                  <div key={index}>
                     <img src={element.imageurl} alt='ingredient_image'/>
                     <span>{element.name} </span>
                     <span>{element.quantity} </span>
                     <span>{element.unit} </span>
                     <span>Estimated cost: ${element.price}</span>
                  </div>
              )
            })}
            <button onClick={() => this.transferToFridge(this.state.shoppingList)}>Add Selected Items to Fridge</button>
         </>
      )
   }
}

export default connect(undefined, {listToFridge})(ShoppingList);