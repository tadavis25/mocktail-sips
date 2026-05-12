const searchForm = 
document.getElementById('search-form');
const searchInput = 
document.getElementById('search-input');
const drinkResults = 
document.getElementById('drink-results');
const errorMessage = 
document.getElementById('error-message');
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
   
    const searchValue = searchInput.value.trim();
    if (!searchValue) {
        errorMessage.textContent = 'Please enter a cocktail name.';
        drinkResults.innerHTML = '';
        return;
    }
    
     fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            drinkResults.innerHTML = '';
            data.drinks.forEach(drink => {
                drinkResults.innerHTML += `
                    <div class="card">
                    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                        <h3>${drink.strDrink}</h3>
                        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                        <p>${drink.strInstructions}</p>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching drink data:', error);
            errorMessage.textContent = 'Error fetching drink data.';
        });


});
