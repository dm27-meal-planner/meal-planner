// 4. in add/edit recipe screen, add an ingredient can show on the ingredient list.
// 5. after press delete button next to the ingredient, it will be removed.
import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import App from '../App';
import Recipe from '../Components/RecipeComponents/Recipe/Recipe'
import RecipeList from '../Components/RecipeComponents/RecipeList/RecipeList'
import RecipeEditor from '../Components/RecipeComponents/RecipeEditor/RecipeEditor'
import RecipeSearchResults from '../Components/RecipeComponents/RecipeSearchResults/RecipeSearchResults'

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

})
afterEach(() => {
    document.body.removeChild(container);
    container = null;
})

test("in add/edit recipe screen, add an ingredient can show on the ingredient list.", () => {
    act(()=>{
        ReactDOM.render(<RecipeEditor />, container);
    })
    const ingredientEditor = container.querySelector("div.ingredientEditor")
    const ingredientInput = ingredientEditor.querySelector("input.searchInput");
    const ingredientQty = ingredientEditor.querySelector("input.qtyInput");
    const ingredientUnit = ingredientEditor.querySelector("input.unitInput");
    const ingredientInfo = ingredientEditor.querySelector("div.ingredientInfo");
    const addButton = ingredientEditor.querySelector("button.addButton");

    ingredientInput.value = "tofu";
    Simulate.change(ingredientInput);

    ingredientQty.value = "1";
    Simulate.change(ingredientQty);

    ingredientUnit.value = "box";
    Simulate.change(ingredientUnit);


    Simulate.click(addButton);

    expect(ingredientInfo.textContent).toBe("1 box tofu");
})


test("after press delete button next to the ingredient, it will be removed.", () => {
    act(()=>{
        ReactDOM.render(<RecipeEditor />, container);
    })
    const ingredientEditor = container.querySelector("div.ingredientEditor")
    const ingredientDelete = ingredientEditor.querySelector("button.deleteBtn:nth-child(1)");
    const numOfIngredient = ingredientEditor.querySelectorAll("button.deleteBtn").length;

    Simulate.click(ingredientDelete);

    expect(ingredientEditor.querySelectorAll("button.deleteBtn").length).toBe(numOfIngredient-1);
})
