// export fun   -> indexedDB.js fun(recipeArr)
// \fun (arg):
//    for recipe in args:
//       add recipe to html page

// Create a function, which takes an array of recipes and prints each object on hmtl page


import { rotatingIcon } from "./base"

export function getSearchInput() {
    const inputValue = document.querySelector(".search__field").value;
    return inputValue
}

export function clearSearchField() {
    document.querySelector(".search__field").value = "";
}


export function printRecipesUI(recipesArr, offset = 1, length = 5) {
    removeArrow()
    clearSearchResults();

    // if (document.querySelector(".results__list").innerText = "") {
    const newRecipesArr = pagination(recipesArr, offset, length)
    console.log("new array: ", newRecipesArr);
    for (let i = 0; i < newRecipesArr.length; i++) {
        const text = createHtmlRecipe(newRecipesArr[i])
        document.querySelector(".results__list").insertAdjacentHTML("beforeend", text)
        // }
    }

}


function clearSearchResults() {
    let el = document.querySelector(".results__list");
    while (el.firstElementChild) {
        console.log("something random");
        el.removeChild(el.firstElementChild)
    }
};


function createHtmlRecipe(rec) {
    const idRec = rec.recipe.uri
    const text = `<li>
    <a class="results__link results__link--active" href=#${idRec} 
        <figure class="results__fig">
            <img src=${rec.recipe.image} alt="Test" width="100" height="100" style="border-radius:50%">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${shortenDescription(rec.recipe.label, 20)}</h4>
            <p class="results__author">${shortenDescription(rec.recipe.source)}</p>
        </div>
    </a>
</li>`
// We added # at href, because we need it for our hashchange event in index.js, has gives an label to the element which will be shown in addressbar after click
    return text
}

function shortenDescription(text, limit = 40) {
    const textArray = text.split(" ");
    let newText = "";
    for (let el of textArray) {
        if ((newText.length + el.length) <= limit) {
            newText += (" " + el);
        }
    }
    return newText + "..."
}


export function addRotatingArrow() {
    document.querySelector(".results").insertAdjacentHTML("afterbegin", rotatingIcon)
}

export function addRotatingArrowMainpage(){
    
}


function removeArrow() {
    const arrow = document.querySelector(".loader")
    if (arrow) {
        arrow.parentNode.removeChild(arrow.parentNode.firstElementChild)
    }
}


function pagination(arr, offset, length) {
    const start = (offset - 1) * length;
    const end = offset * length;
    // console.log(arr.slice(offset, (offset + length)))
    let condition;
    if (start === 0) {
        condition = 1
    }

    else if (end >= arr.length) {
        condition = 3
    }
    else {
        condition = 2
    }
    removeButtons()
    addPageButtons(offset, condition);
    return arr.slice(start, end);

}

function removeButtons() {
    const el = document.querySelector(".results__pages");
    while (el.firstElementChild) {
        el.removeChild(el.firstElementChild)

    }
}

//3 scenarios (1.You are page 1 , Button shows page 2, 2. YOu are in middle of 2 pages (2 Buttons indication previous and following), 3. You are on last page (Button shos precious page), use Offset to navigate through pages)
function addPageButtons(offset, condition) {
    offset = parseInt(offset);
    let buttonNext = `<button class="btn-inline results__btn--next" data-offset=${offset}>
    <span>Page ${offset + 1} </span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-right"></use>
    </svg>
</button>`
    let buttonPrev = `<button class="btn-inline results__btn--prev" data-offset=${offset}>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-left"></use>
</svg>
<span>Page ${offset - 1}</span>
</button>`
    if (condition === 1) {
        document.querySelector(".results__pages").insertAdjacentHTML("beforeend", buttonNext);

    }
    if (condition === 2) {
        document.querySelector(".results__pages").insertAdjacentHTML("beforeend", buttonNext)
        document.querySelector(".results__pages").insertAdjacentHTML("beforeend", buttonPrev);
    }
    if (condition === 3) {
        document.querySelector(".results__pages").insertAdjacentHTML("beforeend", buttonPrev);
    }

}

// Create function to print the recipe you clicked on

