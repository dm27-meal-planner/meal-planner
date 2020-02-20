import React, {Component} from 'react';
import {getUserGroceryList, listToFridge, deleteGroceryItemByMeal, deleteGroceryItemById} from '../../redux/reducers/grocerylistReducer';
import {connect} from 'react-redux';
import './stylesheet/GroceryList.css';
import _ from 'lodash'
import loading from '../../animations/loading.gif'

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

   componentDidUpdate = (prevProps) => {
      if(!_.isEqual(prevProps, this.props)){
         console.log('props changed')
         this.updateGroceryList()
      }
   }


   updateGroceryList = () => {
      this.setState({purchasedItems: []})
      this.setState({shoppingList: this.props.groceryList});
   }

   // purchasingItem = (element) => {
   //    const {purchasedItems} = this.state;
   //    // this function adds / removes the list item in question from the purchased items; my alternative to checkboxes
   //    // if the element is already there, removes it from the list; if it's not, add it
   //    try {if (purchasedItems.indexOf(element) === -1) {
   //       purchasedItems.push(element);
   //       this.setState({purchasedItems});
   //    } else {
   //       purchasedItems.splice(purchasedItems.indexOf(element), 1);
   //       this.setState({purchasedItems});
   //    }} catch(err) {alert('An error has occurred.'); console.log(err);}
   //    console.log(this.state.purchasedItems);
   // }

   highlightPurchasedItems = () => {
      //if the item is in the purchasedItems list, highlight it
   }

   render() {
      return(
         <>
            {this.state.shoppingList.map((element, index) => {
               return (
                  <tr key={element.list_item_id}>
                     <th>
                           <input type='checkbox' id={index} onChange={ e => {
                              if(e.target.checked){
                                 this.setState({
                                    purchasedItems: [...this.state.purchasedItems, this.state.shoppingList[e.target.id]]
                                 })
                              } else {
                                 this.setState({
                                    purchasedItems:this.state.purchasedItems.filter((ele, i) => +i !== +e.target.id)
                                 })
                              }
                           }} />
                     </th>
                     <th><img src={element.imageurl} alt={element.name} />
                     <span>{element.name}</span></th>
                     {/* <th>{parseFloat(element.quantity).toFixed(2)} {element.unit}</th> */}
                     {Number.isInteger(element.quantity) ? 
                     <th>{element.quantity} {element.unit}</th>
                     : <th>{parseFloat(element.quantity).toFixed(2)} {element.unit}</th>}
                     <th>${element.price}</th>
                  </tr>
              )
            })}
               <button onClick={() => this.props.listToFridge(this.props.user_id, this.state.purchasedItems)}>Add Selected Items to Fridge</button>         
            </>
      )
   }
}


export default connect(undefined, {getUserGroceryList, listToFridge, deleteGroceryItemById, deleteGroceryItemByMeal})(ShoppingList);
