import recipe from "./models/search";
import { getSearchInput, printRecipesUI, clearSearchField, addRotatingArrow, clearSearchResults } from "./views/searchView"




async function searchController(searchInput) {

    let query = {
        "method": "GET",
        "url": "https://yummly2.p.rapidapi.com/feeds/search",
        "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "yummly2.p.rapidapi.com",
            "x-rapidapi-key": "b7ac76b9b7msh69a33f600029736p1cd1d9jsn733bcb65bd95"
        },
        "params": //this is what you can change as user
        {
            // "FAT_KCALMax": "1000",
            // "maxTotalTimeInSeconds": "7200",
            "allowedAttribute": "",
            "q": searchInput,
            "start": "0",
            "maxResult": "50"
        }
    }

    //1. Get the query/keyword from search field
    //2. Call Imported-object and create search-object in class (search.js)
    const allRecipeResults = new recipe(query);
    await allRecipeResults.getAPIrecipe();

    //3. Show results(Object.data) in UI

    printRecipesUI(allRecipeResults.responseData);
    




};

const button = document.querySelector(".search__btn");
button.addEventListener("keypress", logKey);
function logKey(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        startPrint()
    }
}
button.addEventListener("click", (e) => {
    e.preventDefault()
    startPrint()

})

function startPrint() {

    const searchInput = getSearchInput();
    addRotatingArrow();
    searchController(searchInput);
    clearSearchField();
    
}
