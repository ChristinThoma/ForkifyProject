import recipe from "./models/search";
import { getSearchInput, printRecipesUI, clearSearchField, addRotatingArrow, clearSearchResults } from "./views/searchView"
import { query } from "./views/base";


let state = {};

async function searchController(query, searchInput) {
    query.params.q = searchInput;
    console.log(query);
    //1. Get the query/keyword from search field
    //2. Call Imported-object and create search-object in class (search.js)
    state.allRecipeResults = new recipe(query);
    await state.allRecipeResults.getAPIrecipe();

    //3. Show results(Object.data) in UI

    printRecipesUI(state.allRecipeResults.responseData);
};


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




function changePage() {
    printRecipesUI(recipesArr, 2)
}

function init() {


    const button = document.querySelector(".search__btn");
    button.addEventListener("keypress", logKey);
    button.addEventListener("click", (e) => {
        e.preventDefault()
        startPrint()

    })

    const nextButton = document.querySelector(".results__pages")
    nextButton.addEventListener("click", log)
    function log(e) {
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
    }
}

init()