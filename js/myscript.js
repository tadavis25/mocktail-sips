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
                    <div class="col-md-4 mb-4">
                    <div class="card h-100">
                    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" 
                    class="card-img-top">
                     
                    <div class="card-body">
                      <h5>${drink.strDrink}</h5>
                        <p>${drink.strInstructions.slice(0, 100)}...</p>
                        <p><strong>Glass:</strong> ${drink.strGlass}</p>
                          <p><strong>Category:</strong> ${drink.strCategory}</p>

                          <p>${drink.strIngredient1}</p>
                           <p>${drink.strIngredient2}</p>
                             <p>${drink.strIngredient3}</p>
                           </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching drink data:', error);
            errorMessage.textContent = 'Error fetching drink data.';
        });


});
