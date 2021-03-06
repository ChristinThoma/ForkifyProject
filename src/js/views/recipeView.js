import { rotatingIcon } from "./base"

export function printRecipe(recipeData) {
    clearSearchResults()
    // removeArrow()
    console.log(recipeData);
    const text = `<figure class="recipe__fig">
    <img src=${recipeData.image} alt=${recipeData.label} class="recipe__img">
    <h1 class="recipe__title">
        <span>${recipeData.label}</span>
    </h1>
</figure>
<div class="recipe__details">
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipeData.totalTime}</span>
        <span class="recipe__info-text"> minutes</span>
    </div>
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${recipeData.yield}</span>
        <span class="recipe__info-text"> servings</span>

        <div class="recipe__info-buttons">
            <button class="btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-minus"></use>
                </svg>
            </button>
            <button class="btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-plus"></use>
                </svg>
            </button>
        </div>

    </div>
    <button class="recipe__love">
        <svg class="header__likes">
            <use href="img/icons.svg#icon-heart-outlined"></use>
        </svg>
    </button>
</div>



<div class="recipe__ingredients">
    <ul class="recipe__ingredient-list">
   
    </ul>

    <button class="btn-small recipe__btn">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-shopping-cart"></use>
        </svg>
        <span>Add to shopping list</span>
    </button>
</div>

<div class="recipe__directions">
    <h2 class="heading-2">How to cook it</h2>
    <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__by">${recipeData.source}</span>. Please check out directions at their website.
    </p>
    <a class="btn-small recipe__btn" href=${recipeData.url} target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>

    </a>
</div>`
    document.querySelector(".recipe").insertAdjacentHTML("afterbegin", text)
}

// export function printIngredients(recipeData) {
//     const text = `<li class="recipe__item">
// <svg class="recipe__icon">
//     <use href="img/icons.svg#icon-check"></use>
// </svg>
// <div class="recipe__count">${callWeight(recipeData)} </div >

//     <div class="recipe__ingredient">
//         <span class="recipe__unit">g</span>
//     name
// </div>
// </li >
//     `
//     document.querySelector(".recipe__ingredient-list").insertAdjacentHTML("beforeend", text)
// }

export function printIngredients(recipeData) {
    let ingredientList = "";
    for (let i = 0; i < recipeData.ingredientLines.length; i++) {
        const pattern = /^[\d,".","/"]+/;
        let rec = `<li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>`
        const weight = recipeData.ingredientLines[i].match(pattern);
        if (weight !== null) {
            const count = `<div class="recipe__count"> ${weight} </div >`;
            rec += count
        }

        if (recipeData.ingredientLines[i].includes(weight)) {
            const ingredient = recipeData.ingredientLines[i].replace(weight, "");
            const unitName = `<span class="recipe__ingredient">${ingredient}</span>`
            rec += unitName;
        }
        else {
            rec += recipeData.ingredientLines[i]
        }
        rec += `</li>`


        ingredientList = ingredientList + rec;
    }
    document.querySelector(".recipe__ingredient-list").insertAdjacentHTML("afterbegin", ingredientList);
    // changeAmount();

}

export function addRotatingArrowMainpage() {
    document.querySelector(".recipe").insertAdjacentHTML("afterbegin", rotatingIcon)
}

function removeArrow() {
    const arrow = document.querySelector(".loader")
    if (arrow) {
        arrow.parentNode.removeChild(arrow.parentNode.firstElementChild)
    }
}

function clearSearchResults() {
    let el = document.querySelector(".recipe");
    while (el.firstElementChild) {
        console.log("something random");
        el.removeChild(el.firstElementChild)
    }
};



export function printNewCounts(count, newCount, newServing) {
    count.innerHTML = newCount;
    // count[i].insertAdjacentHTML("afterbegin", newServing)
    document.querySelector(".recipe__info-data--people").innerHTML = newServing

}
// export function calNewServings(recentServing, operator) {
    //copied to base (here will be just the HTML Transfer)
    // let count = document.querySelectorAll(".recipe__count")
    // console.log(Array.from(count));
    // for (let i = 0; i < count.length; i++) {
    //     const numberStr = count[i].innerText
    //     const splitArr = numberStr.split("/")
    //     console.log(splitArr)
    //     let r
    //     if (splitArr.length === 1)
    //         r = parseFloat(splitArr[0])
    //     else
    //         r = parseFloat(splitArr[0] / splitArr[1])
    //     // let r = parseInt(count[i].innerText);
    //     recentIngredientsObj.count.push(r);
    //     console.log(recentIngredientsObj)
    //     let newCount;
    //     let newServing;
    //     if (operator === "+") {
    //         newServing = recentServing + 1;
    //         newCount = (r / recentServing) * (newServing)
    //     }
    //     if (operator === "-") {
    //         newServing = recentServing - 1;
    //         newCount = (r / recentServing) * (newServing)
    //     }
    //     console.log(r, newCount)
    //     r = r.toString();
    //     newCount = newCount.toString();
    //     console.log(r, newCount)
    //     count[i].innerHTML = newCount
        // count[i].insertAdjacentHTML("afterbegin", newServing)
//         document.querySelector(".recipe__info-data--people").innerHTML = newServing
//     }
// }
// create if function if / , if yes divide it,
// create if functions to adjust the steps in the counting