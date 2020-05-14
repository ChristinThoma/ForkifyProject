export function printShoppingItems(ingrCounts) {
    console.log(ingrCounts);
    let ingrName = Array.from(document.querySelectorAll(".recipe__ingredient"))
    for (let i = 0; i < ingrName.length; i++) {
        let text = `<li class="shopping__item">
            <div class="shopping__count">
                <input type="number" value=${ingrCounts[i]} step=${calSteps(ingrCounts[i])}>
            </div>
            <p class="shopping__description">${ingrName[i].innerText}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
            </li>`;
        document.querySelector(".shopping__list").insertAdjacentHTML("beforeend", text)
    }

}
// let recipeDataHtml= document.querySelectorAll(".recipe__item")

function calSteps(count){
    if(count<=1){
        return 1
    }
    if (count<= 100){
        return 10
    }
    else {
        return 100
    }
}