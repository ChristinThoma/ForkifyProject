// export fun   -> indexedDB.js fun(recipeArr)
// \fun (arg):
//    for recipe in args:
//       add recipe to html page

// Create a function, which takes an array of recipes and prints each object on hmtl page

var UIModule = (function () {


    return {
        DomElement: {

        }
    }
})();

import { rotatingIcon } from "./base"

export function getSearchInput() {
    const inputValue = document.querySelector(".search__field").value;
    return inputValue
}

export function clearSearchField() {
    document.querySelector(".search__field").value = "";
}


export function printRecipesUI(recipesArr) {
    removeArrow()
    clearSearchResults();
    // if (document.querySelector(".results__list").innerText = "") {
    for (let i = 0; i < recipesArr.length; i++) {
        const text = createHtmlRecipe(recipesArr[i])
        document.querySelector(".results__list").insertAdjacentHTML("beforeend", text)
        // }
    }

}


function clearSearchResults() {
    let el = document.querySelector(".results__list");
    while (el.firstElementChild) {
        el.removeChild(el.firstElementChild)
    }
};


function createHtmlRecipe(rec) {
    const text = `<li>
    <a class="results__link results__link--active" href=${rec.content.details.recipeId}
        <figure class="results__fig">
            <img src=${rec.content.details.images[0].resizableImageUrl} alt="Test" width="100" height="100" style="border-radius:50%">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${shortenDescription(rec.display.displayName, 20)}</h4>
            <p class="results__author">${shortenDescription(rec.content.description.text)}</p>
        </div>
    </a>
</li>`
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

function removeArrow() {
    document.querySelector(".results").removeChild(document.querySelector(".results").firstElementChild)
}


//3 scenarios (1.You are page 1 , Button shows page 2, 2. YOu are in middle of 2 pages (2 Buttons indication previous and following), 3. You are on last page (Button shos precious page), use Offset to navigate through pages)
// function organizePage(offset = 1) {
//     Arr = ["Pizza", "Ei", "lasagne", "frucht", "bla", "bli", "blub", "something", "something else", "greatest dish"];
//     while (Arr != "") {
//         Arr.slice(offset, (offset + 5))
//     }
//     let buttonNext = `<button class="btn-inline results__btn--next">
//     <span>Page ${offset + 1} </span>
//     <svg class="search__icon">
//         <use href="img/icons.svg#icon-triangle-right"></use>
//     </svg>
// </button>`
//     if (offset === 1) {
//         document.querySelector(".results__pages").insertAdjacentElement("afterbeginn", buttonNext);
//         console.log(Arr)
//     }
//     if (offset === array.total - 1) {

//     }

// }

