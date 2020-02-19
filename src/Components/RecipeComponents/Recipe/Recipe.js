import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import AddToMealPlanCard from '../RecipeCards/AddToMealPlanCard/AddToMealPlanCard';
import loading from '../../../animations/loading.gif'
import { Rate } from 'antd'
import './stylesheet/Recipe.scss'
class Recipe extends Component {
    constructor() {
        super();
        this.state = {
            recipeId: '',
            recipeImg: '',
            recipeName: '',
            recipeSource: '',
            recipeAuthor: '',
            recipeAuthorId: '',
            recipeReview: 0,
            deleteWindowFlag: false,
            addMPWindowFlag: false,

            recipeServings: 0,
            recipeCuisine: '',
            recipeMealType: '',
            recipeTime: 0,
            recipePrepTime: 0,
            recipeCookTime: 0,
            recipeDes: '',

            recipeNutrition: {},

            recipeIngredients: [],

            recipeDirection: '',
            loading:true
        }
    }

    componentDidMount() {
        let sourceId = this.props.match.params.recipe_id;
        axios.get(`/api/recipe/id/${sourceId}`).then(response => {
            this.setState({

                recipeId: response.data.recipe_id,
                recipeImg: response.data.recipe_img,
                recipeName: response.data.recipe_name,
                recipeSource: response.data.recipe_source,
                recipeAuthor: response.data.recipe_author,
                recipeAuthorId: response.data.recipe_author_id,
                recipeReview: response.data.recipe_review,

                recipeServings: response.data.recipe_servings,
                recipeCuisine: response.data.recipe_cuisine,
                recipeMealType: response.data.recipe_meal_type,
                recipeTime: response.data.recipe_time,
                recipePrepTime: response.data.recipe_prep_time,
                recipeCookTime: response.data.recipe_cook_time,
                recipeDes: response.data.recipe_description,

                recipeNutrition: response.data.recipe_nutrition,

                recipeIngredients: response.data.recipe_ingredients,

                recipeDirection: response.data.recipe_directions,
                loading: false

            })
        })
    }

    handleEdit = () => {
        // go to edit page.
        // alert('Working on edit btn...');
        this.props.history.push(`/recipe/edit/${this.props.match.params.recipe_id}`);
    }

    handleDeleteWindow = () => {
        this.setState({
            deleteWindowFlag: !this.state.deleteWindowFlag
        })
    }

    handleDelete = () => {
        // **delete the recipe.
        alert('Working on delete btn...');
        // go back to search recipe page.
        this.props.history.push('/recipes');
    }


    handleMPWindow = () => {
        this.setState({
            addMPWindowFlag: !this.state.addMPWindowFlag
        })
    }

    render() {
        // only author can modify/delete the recipe
        let recipeModifyButtons = (this.state.recipeAuthorId === this.props.user_id) ? (
            <div className='recipe-modify-btn'>
                <button onClick={() => { this.handleEdit() }} >Edit</button>
                <button onClick={() => { this.handleDeleteWindow() }} >Delete</button>
            </div>) : null;
        // delete window
        let deleteWindow = this.state.deleteWindowFlag ?
            (<div className='delete-window'>
                <div>
                    Are you sure you want to delete this recipe? This cannot be undone!
                </div>
                <div>
                    <button onClick={() => { this.handleDeleteWindow() }}>Go back</button>
                    <button onClick={() => { this.handleDelete() }}>Delete</button>
                </div>
            </div>) : null;
        // add to meal plan window
        let addMPWindow = this.state.addMPWindowFlag ?
            (<AddToMealPlanCard 
                recipeId={this.props.match.params.recipe_id}
                recipeNutrition={this.state.recipeNutrition}
                recipeMealType={this.state.recipeMealType}
                recipeName={this.state.recipeName}
                recipeImg={this.state.recipeImg}
                />) : null;
        // ** beautify later
        let nutrition = JSON.stringify(this.state.recipeNutrition);

        if(this.state.loading){
            return (
                <img src={loading} alt='loading' />
            )
        }

        console.log(this.state.recipeDirection.split(/([0-9]\.)/g))

        return (
            <div className='Recipe-wrapper'>
                {/* <div>**You are in the recipe {this.props.match.params.recipe_id} and here is still working...</div> */}
                <div className='top-level' >
                    <div className='header-wrapper' >
                        <div className='Recipe-title-wrapper'>
                            <div className='Recipe-name'>{this.state.recipeName} </div>
                            <img className='Recipe-img' src={this.state.recipeImg} alt='Recipe-img' />
                            {recipeModifyButtons}
                            {deleteWindow}
                            {addMPWindow}
                            <Rate className='rating' disabled value={this.state.recipeReview} />
                        </div>
                            <button id='add-to-recipe' onClick={this.handleMPWindow}>Add to Meal Plan</button>
                        </div>
                        <div className='Recipe-info-wrapper'>
                            <ul>
                                <li><b>Time to make:</b> <p>{this.state.recipeCookTime} minutes</p> </li>
                                <li><b>Meal Type:</b> <p>{this.state.recipeMealType}</p></li>
                                <li><b>Dish Type:</b> <p>{this.state.recipeDishType}</p></li>
                                <li><b>Description:</b> <p >{this.state.recipeDes}</p></li>
                            </ul>
                        </div>
                        <div className='Recipe-nutrition-wrapper'>
                            <table>
                                    {JSON.parse(nutrition).slice(0,9).map(ele =>{
                                    return(
                                        <tr>
                                            <th>{ele.title}</th>
                                            <td>{ele.amount} {ele.unit}</td>
                                        </tr>
                                    ) 
                                    })
                                    }
                            </table>
                        </div>
                </div>
                <div className='bottom-level'>
                    <div className='Recipe-ingredient-wrapper'>
                        {/* ** waiting for ingredient to be implemented. */}
                        <ul >
                        {this.state.recipeIngredients.map((e, i) => {
                            return (
                                    <li key={i} ><i>{e.amount} {e.unit}</i> {e.name}</li>
                                    )
                                })}
                        </ul>
                    </div>
                    <div className='Recipe-direction-wrapper'>
                        <ul>
                            {this.state.recipeDirection.split(/([0-9]\.)/g).map(ele => {
                                return <li> {ele} </li>
                        })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (reduxState) {
    return {
        user_id: reduxState.user.user_id,
    }
}

export default connect(mapStateToProps, {})(Recipe);