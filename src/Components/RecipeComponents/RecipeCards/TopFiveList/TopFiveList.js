import React, {Component} from 'react';
import RecipeOutlineCard from './RecipeOutlineCard/RecipeOutlineCard';

class TopFiveList extends Component{
    constructor(){
        super();
    }
    render(){
        const recipeList = this.props.recipeList.map(r=>{return (
            <RecipeOutlineCard recipe={r} editFlag={this.props.editFlag}/>
        )})
        return (
            <div>
                <span>{this.props.listName} </span>
                {recipeList}                
            </div>
        )
    }
}
export default TopFiveList;