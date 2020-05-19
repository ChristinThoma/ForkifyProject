import { printIngredients } from "./recipeView";

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
    if(count<=10){
        return 1
    }
    if (count<= 100){
        return 10
    }
    else {
        return 100
    }
}

export function deleteIngredient(clickElement){
    console.log(clickElement)
}


// Addition 
// Persistent
// getItem
// removeItem
// setItem
// clear

// store data:
// localStorage.setItem("MyName", "Christin)- its local Storage, keeps information as long as IP doesnt change

// get data:
// localStorage.getItem("My Name")
// "Christin"

// removeItem:
// localStorage.removeItem("My Name")

// Json stringyfy, to make a Object, json parse
// let jason= JSON.stringify({value:"hello"})(if its object, if its not an object I create my object by myself)
// undefined

// JSON.parse(jason)
// {value: "hello"}

// 1.delete likes
// 2 add shopping withpuit count3
// 3 presistsant likes, printIngredients
// 4 print recipe wehen like clicked