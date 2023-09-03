const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipeContainer=document.querySelector('.recipe-container');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeCloseBtn=document.querySelector('.recipe-close-btn');

const fetchRecipes= async (query)=>{
    recipeContainer.innerHTML="<h2>Fetching Recipes....</h2>";
    try {

        const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        // fetch returns promise
        const response=await data.json();
        // converts data to json and store in response variable
        // console.log(response);
        // console.log(response.meals[0]);
        recipeContainer.innerHTML="";
        response.meals.forEach(meal => {
            // console.log(meal);
            const recipeDiv=document.createElement('div');
            // createElement() helps to create element in html like div
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML=`
             <img src="${meal.strMealThumb}">
             <h3>${meal.strMeal}</h3>
             <p><span>${meal.strArea}</span> Dish</p>
             <p>Belongs to<span> ${meal.strCategory}</span> Category</p>
            `
    
            const button=document.createElement('button');
            button.textContent="View Recipe";
            recipeDiv.appendChild(button);
    
            // Adding EventListner to recipe button
            button.addEventListener('click',()=>{
                openRecipePopup(meal);
            });
            
            recipeContainer.appendChild(recipeDiv);
        });

    } catch (error) {
        recipeContainer.innerHTML="<h2>Error in fetching Recipes.....</h2>";   
    }  
}

// function to fetch ingredients and measurements 
const fetchIngredients = (meal) => {
    // console.log(meal);
    let ingredientList="";
    for(let i=1;i<=20;i++)
    {
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient) 
        {
            const measure=meal[`strMeasure${i}`];
            ingredientList+=`<li>${measure} ${ingredient}</li>`
        } 
        else
        {
            break;
        }
    }
    return ingredientList;
}
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>

    <h3>Ingrediants:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
   
    <div class"recipeInstruction">
        <h3>Insturctions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display="block";
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
});

searchBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    const searchInput=searchBox.value.trim();
    if(!searchInput)
    {
        recipeContainer.innerHTML="<h2>Type the meal in the search box....</h2>";
        return;
    }
    fetchRecipes(searchInput);
    // console.log("Button Clicked!!");
});