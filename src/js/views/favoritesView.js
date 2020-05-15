export function printFavorites(recipeData) {
    console.log(recipeData);
    let text = ` <li>
    <a class="likes__link" href=${recipeData.url}>
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

