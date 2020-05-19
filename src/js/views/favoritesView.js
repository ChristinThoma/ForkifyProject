export function printFavorites(recipeData) {
    console.log(recipeData);
    let text = ` <li>
    <a class="likes__link" href=#>
    <button class="btn-tiny delete__like" style="transform: rotate(45deg)">
    <svg>
    <use href="img/icons.svg#icon-circle-with-plus"></use>
    </svg>
    </button>
        <figure class="likes__fig">
            <img src=${recipeData.image} alt="Test">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${recipeData.label}</h4>
            <p class="likes__author">${recipeData.source}</p>
        </div>
    </a>
</li>`
    document.querySelector(".likes__list").insertAdjacentHTML("afterbegin", text)
}

