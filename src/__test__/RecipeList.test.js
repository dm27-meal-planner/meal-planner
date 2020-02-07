// Component unit test - recipe: 
// 1. in FindRecipe component, put 'pasta' in the search input, check if the result area including all the recipes' name like '%pasta%'

// 2. after loading Recipe component, the area shows 'recently added recipe' has the latest recipes
// 3. after loading Recipe component, the area shows 'most liked recipe' has the most liked recipes

import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
// import App from '../App';
import RecipeList from '../Components/RecipeComponents/RecipeList/RecipeList'
import RecipeEditor from '../Components/RecipeComponents/RecipeEditor/RecipeEditor'


let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

})
afterEach(() => {
    document.body.removeChild(container);
    container = null;
})

test("in FindRecipe component, put 'pasta' in the search input, check if the result area including all the recipes' name like '%pasta%'", () => {
    act(()=>{
        ReactDOM.render(<RecipeList />, container);
    })
    const inputField = container.querySelector("input")
    // className = search-btn
    const button = container.querySelector("button.search-button")
    // const h1 = container.querySelector("h1:nth-child(1)");
    inputField.value = "pasta";
    Simulate.change(inputField);
    Simulate.click(button);

    setTimeout(()=>{
        const name = container.querySelector("div.recipeName");
        expect(name.textContent.toLowerCase()).toBe(expect.stringContaining("pasta"));
    }, 2000)
})
test("after loading Recipe component, the area shows 'recently added recipe' and not null", () => {
    act(()=>{
        ReactDOM.render(<RecipeList />, container);
    })
    const recentlyAdded = container.querySelector("div.recentlyAdded")
    expect(recentlyAdded).not.toBeNull();
})
test("after loading Recipe component, the area shows 'most liked recipe' and not null", () => {
    act(()=>{
        ReactDOM.render(<RecipeList />, container);
    })
    const mostLiked = container.querySelector("div.mostLiked")
    expect(mostLiked).not.toBeNull();
})

