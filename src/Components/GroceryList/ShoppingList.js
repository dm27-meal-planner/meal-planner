import React, {Component} from 'react';
import {getUserGroceryList, listToFridge} from '../../redux/reducers/grocerylistReducer';
import {connect} from 'react-redux';

class ShoppingList extends Component {
   constructor() {
      super();
      this.state = {
         shoppingList: [],
         purchasedItems: []
      }
   }

   componentDidMount = () => {
      this.updateGroceryList();
   }

   // The user should be able to check boxes in the shopping list so they can add items
   // that they actually shopped for
   transferToFridge = async (list) => {
      await this.props.listToFridge(this.props.user_id, list);
      this.updateGroceryList();
   }

   updateGroceryList = () => {
      this.setState({shoppingList: this.props.groceryList});
   }

   purchasingItem = (element) => {
      const {purchasedItems} = this.state;
      // this function adds / removes the list item in question from the purchased items; my alternative to checkboxes
      // if the element is already there, removes it from the list; if it's not, add it
      try {if (purchasedItems.indexOf(element) === -1) {
         purchasedItems.push(element);
         this.setState({purchasedItems});
      } else {
         purchasedItems.splice(purchasedItems.indexOf(element), 1);
         this.setState({purchasedItems});
      }} catch(err) {alert('An error has occurred.'); console.log(err);}
      console.log(this.state.purchasedItems);
   }

   highlightPurchasedItems = () => {
      //if the item is in the purchasedItems list, highlight it
   }

   render() {
      return(
         <>
            {this.state.shoppingList.map((element, index) => {
               return (
                  <div key={element.list_item_id} onClick={() => this.purchasingItem(element)}>
                     <img src={element.imageurl} alt='ingredient_image'/>
                     <span>{element.name} </span>
                     <span>{element.quantity} </span>
                     <span>{element.unit} </span>
                     <span>Estimated cost: ${element.price}</span>
                  </div>
              )
            })}
            <button onClick={() => this.transferToFridge(this.state.purchasedItems)}>Add Selected Items to Fridge</button>
         </>
      )
   }
}

export default connect(undefined, {getUserGroceryList, listToFridge})(ShoppingList);