const recipes = [
    { id: 1, name: "Vegan Tacos", category: "vegan", rating: 4.5, ingredients: ["Taco shells", "Lettuce", "Tomatoes"], instructions: "Combine taco shells with toppings and enjoy!" },
    { id: 2, name: "Gluten-Free Pasta", category: "gluten-free", rating: 4.7, ingredients: ["Gluten-free pasta", "Tomato sauce"], instructions: "Boil pasta and mix with tomato sauce." },
    { id: 3, name: "Low-Carb Salad", category: "low-carb", rating: 4.0, ingredients: ["Lettuce", "Chicken", "Avocado"], instructions: "Toss all ingredients together and serve." },
    { id: 4, name: "Chicken Soup", category: "gluten-free", rating: 4.3, ingredients: ["Chicken", "Carrots", "Onions"], instructions: "Boil chicken with carrots and onions for 30 minutes." },
];

document.addEventListener("DOMContentLoaded", () => {
    displayRecipes(recipes);
});
function displayRecipes(recipesArray) {
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = ''; 
    
    recipesArray.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <h3><a href="recipe-details.html?id=${recipe.id}">${recipe.name}</a></h3>
            <p>Category: ${recipe.category}</p>
            <p>Rating: ${recipe.rating}</p>
            <button onclick="saveToFavorites(${recipe.id})">Save to Favorites</button>
        `;
        recipeList.appendChild(recipeCard);
    });
}

function filterRecipes() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const category = document.getElementById("category-select").value;

    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.name.toLowerCase().includes(searchTerm) || recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm));
        const matchesCategory = category ? recipe.category === category : true;
        return matchesSearch && matchesCategory;
    });

    displayRecipes(filteredRecipes);
}

function saveToFavorites(recipeId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const recipeToSave = recipes.find(recipe => recipe.id === recipeId);
    
    if (!favorites.some(favorite => favorite.id === recipeId)) {
        favorites.push(recipeToSave);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}
function showFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    displayRecipes(favorites);
}
