import AllRecipes from "./models/search";
import { getSearchInput, printRecipesUI, clearSearchField, addRotatingArrow, clearSearchResults } from "./views/searchView"
import { query } from "./views/base";
import { OneRecipe } from "./models/recipe";
import { printRecipe, printIngredients, addRotatingArrowMainpage, calNewServings, printNewCounts } from "./views/recipeView";
import { printShoppingItems } from "./views/shoppingListView"
import {printFavorites} from "./views/favoritesView"


let state = {};

async function searchController(query, searchInput) {
    const queryCopy = JSON.parse(JSON.stringify(query));
    console.log(query)
    queryCopy.params.q = searchInput;
    console.log(queryCopy);
    //1. Get the query/keyword from search field
    //2. Call Imported-object and create search-object in class (search.js)
    state.allRecipeResults = new AllRecipes(queryCopy);
    await state.allRecipeResults.getAPIrecipe();

    //3. Show results(Object.data) in UI

    printRecipesUI(state.allRecipeResults.responseData);
};

async function recipeController(query, recipeId) {
    const queryCopy = JSON.parse(JSON.stringify(query))
    queryCopy.params.r = recipeId;
    console.log(query)
    console.log(queryCopy);
    addRotatingArrowMainpage();
    state.clickedRecipe = new OneRecipe(queryCopy);
    // addRotatingArrow()
    await state.clickedRecipe.getAPIrecipe(recipeId);
    printRecipe(state.clickedRecipe.responseData);
    printIngredients(state.clickedRecipe.responseData)
    currentCounts()

}


function logKey(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        startPrint()
    }
}


function startPrint() {

    const searchInput = getSearchInput();
    addRotatingArrow();
    searchController(query, searchInput);
    clearSearchField();

}
function currentCounts() {
    let count = document.querySelectorAll(".recipe__count")
    state.allCountsCurrentRecipe = []
    console.log(Array.from(count));
    for (let i = 0; i < count.length; i++) {
        const numberStr = count[i].innerText
        const splitArr = numberStr.split("/")
        console.log(splitArr)
        let r
        if (splitArr.length === 1)
            r = parseFloat(splitArr[0])
        else
            r = parseFloat(splitArr[0] / splitArr[1])
        // let r = parseInt(count[i].innerText);
        // recentIngredientsObj.count.push(r);
        // console.log(recentIngredientsObj)
        //!!!!
        state.allCountsCurrentRecipe.push(r)
        //!!!!
    }
}


function calCounts(recentServing, operator) {

    let count = document.querySelectorAll(".recipe__count")

    // state.allCountsCurrentRecipe=[]
    // console.log(Array.from(count));
    for (let i = 0; i < count.length; i++) {
        //     const numberStr = count[i].innerText
        //     const splitArr = numberStr.split("/")
        //     console.log(splitArr)
        //     let r
        //     if (splitArr.length === 1)
        //         r = parseFloat(splitArr[0])
        //     else
        //         r = parseFloat(splitArr[0] / splitArr[1])
        //     // let r = parseInt(count[i].innerText);
        //     // recentIngredientsObj.count.push(r);
        //     // console.log(recentIngredientsObj)
        //    //!!!!
        //     state.allCountsCurrentRecipe.push(r)
        //     console.log(state)
        //     //!!!!
        //     // stop returning from here
        let r = state.allCountsCurrentRecipe[i]
        let newCount;
        let newServing;
        if (operator === "+") {
            newServing = recentServing + 1;
            newCount = (r / recentServing) * (newServing)
        }
        if (operator === "-") {
            newServing = recentServing - 1;
            newCount = (r / recentServing) * (newServing)
        }
        newCount = Number.parseFloat(newCount).toPrecision(2);
        state.allCountsCurrentRecipe[i] = newCount;
        printNewCounts(count[i], newCount, newServing)
    }
}

// changed counting calCount to index.js (seperate counting and printing)
// seperate spliting of number (until now we split just in the function were we add servings

function init() {


    const button = document.querySelector(".search__btn");
    button.addEventListener("keypress", logKey);
    button.addEventListener("click", (e) => {
        e.preventDefault()
        startPrint()

    })

    const nextButton = document.querySelector(".results")
    nextButton.addEventListener("click", resultsHandler)
    function resultsHandler(e) {
        const target = e.target;
        const clickElement = target.closest(".btn-inline");
        if (clickElement) {
            const btnClassList = Array.from(clickElement.classList);
            if (btnClassList.includes("results__btn--prev")) {
                printRecipesUI(state.allRecipeResults.responseData, parseInt(clickElement.dataset.offset) - 1);
            }
            else if (btnClassList.includes("results__btn--next")) {
                printRecipesUI(state.allRecipeResults.responseData, parseInt(clickElement.dataset.offset) + 1);

            }
        }
        // ONE WAY TO ADD EVENT LISTENER ON RECIPE, SEE OTHER WAY HASH LISTENER
        // const clickElementRec = target.closest(".results__link")
        // if (clickElementRec) {
        //     e.preventDefault();
        //     const recipeId = clickElementRec.href;

        //     recipeController(query, recipeId);

        // }
    }

    window.addEventListener("hashchange", e => {
        const hashrecipe = window.location.hash;
        const recipeId = hashrecipe.replace("#", "");
        console.log(recipeId)
        recipeController(query, recipeId)
    }
    )
    const serving = document.querySelector(".recipe");
    serving.addEventListener("click", clickHandler)
    function clickHandler(e) {
        const target = e.target;
        const clickElement = target.closest(".btn-tiny");
        const shoppingClick = target.closest(".recipe__btn");
        const loveClick= target.closest(".recipe__love");
        if (clickElement) {
            let recentServing = document.querySelector(".recipe__info-data--people").innerText;
            recentServing = parseInt(recentServing);
            // let operator ;
            if (clickElement.innerHTML.includes("icon-circle-with-minus")) {
                //change serving one down
                //calNewServings(recentServing, "-")
                calCounts(recentServing, "-")

            };
            if (clickElement.innerHTML.includes("icon-circle-with-plus")) {
                //change serving one up in recipe view
                // calNewServings(recentServing, "+")
                calCounts(recentServing, "+")
            }
        }
        if (shoppingClick) {
            console.log("hej")
            printShoppingItems(state.allCountsCurrentRecipe)
        }
        if(loveClick){
            printFavorites(state.clickedRecipe.responseData)

        }
    }

}



// Print one-recipe steps
// add eventListener, cascade to whole recipe element= closest(),(in index)
//import query OneRecipe
//click happens: 
// vanish grafical interface: clear recipe field, clear seaechresult highlight
// change CSS of clicked element(get element also from event, use closest), f.i. change color to lighter grey
//add arrow until API reacts, vanish arrow when recipe is printed
// get recipe Id from event listener (eventplace or somehting)
// create new OneRecipe with query, call method with ID,
// Get Information you need from newRecipe Object (Name, Ingredients, Photo, Link to recipe)
// Print these information in searchView by adding them to html


init()