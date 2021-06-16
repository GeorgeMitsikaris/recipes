import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Search() {
	const [recipe, setRecipe] = useState('');
  const [recipes, setRecipes] = useState([]);
  let searchTerm = '';

  const getRecipes = (inputRecipe) => {
    axios
			.get(
				`https://api.spoonacular.com/recipes/findByIngredients?apiKey=fdde02e0fc0b4987bd9b175b0f55f263`, {
          params: {
            ingredients: recipe
          }
        }
			)
			.then((result) => {
				setRecipes(result.data);
			});
  }

  useEffect(() => {
    getRecipes(searchTerm);
  }, [searchTerm])

  const renderRecipes = recipes.map(recipe => {
    return <div key={recipe.id}>{recipe.title}</div>
  })  

	return (
		<div>
			<h3>Search for recipes</h3>
			<input
				value={recipe}
				onChange={e => {
          e.preventDefault();
          setRecipe(e.target.value)
          }
        }
			/>
      <button onClick={() => {
        searchTerm = recipe;
        getRecipes(searchTerm)}
      }>Search for recipes</button>
      {renderRecipes}
		</div>
	);
}

export default Search; 
