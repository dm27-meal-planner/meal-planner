import React, {Component} from 'react';
import axios from 'axios'
import SearchItem from './SearchItem';
import ListItem from './ListItem';

class GroceryList extends Component{
    constructor(){
        super();
        this.state = {
            searchInput: '',
            searchResults: [],
            list: [],
            editMode: false
        }
    }
    getSearchResults = (searchPhrase) => {
         axios.post('/api/ingredient/search', {searchPhrase: this.state.searchInput})
                .then(res => {
                    this.setState({
                        searchResults: res.data
                    })
                })
    }

    addToList = async(ingredient) => {
        let price = await axios.post('/api/ingredient/price', {id: ingredient.id, amount: ingredient.amount, unit:ingredient.unit})
                            .then(res => res.data)

                            
        this.setState({
            list: [...this.state.list, {...ingredient, price: price}]
        })
    }
    
    removeItem = (i) => {
        let list = this.state.list.slice()

        list.splice(i, 1)

        this.setState({
            list : list 
        })
    }

    saveChanges = (i, amount) => {
        let list = this.state.list.slice(i)

        list.splice(i, 1, {...this.state.list[i], amount: amount})

        this.setState({
            list: list
        })
    }

    handelInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }
    render(){
        console.log(this.state)
        let searchResults = this.state.searchResults.map((ele, i) => {
            return(
                <SearchItem name={ele.name} image={ele.image} possibleUnits={ele.possibleUnits} addToList={this.addToList} id={ele.id} key={i} />
            )
        })
        let list = this.state.list.map((ele, i) => {
            return (
                <ListItem name={ele.name} image={ele.image} amount={ele.amount} unit={ele.unit} price={ele.price} i={i} key={i} saveChanges={this.saveChanges} removeItem={this.removeItem}/>
            )
        })
        return (
            <div>
                <ul>
                    {searchResults}
                </ul>
                GroceryList
                <input name='searchInput' onChange={this.handelInputChange}/> 
                <button onClick={this.getSearchResults}>search</button>
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}
export default GroceryList;