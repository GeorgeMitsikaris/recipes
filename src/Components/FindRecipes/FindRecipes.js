import React, { useState } from "react";
import axios from "axios";

import styles from "./FindRecipes.module.css";
import FindRecipe from "./FindRecipe/FindRecipe";

const FindRecipes = () => {
	const [recipe, setRecipe] = useState("");
	const [recipes, setRecipes] = useState([]);

	// We search for recipes by pressing the Enter buttons
	const pressEnterHandler = (e) => {
		if (e.code === "Enter" || e.code === "NumpadEnter") {
			getRecipes();
		}
	};

	// The following method is fetching 40 recipes which have instruction based on user input (comma separated ingredients) and stores them locally.
	const getRecipes = async () => {
		const { data } = await axios.get(
			`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SPOONACULAR}`,
			{
				params: {
					ingredients: recipe,
					instructionsRequired: true,
					number: 40,
				},
			}
		);
		setRecipes(data);
	};

	// Used ingredients are the ingredients that the user typed and the recipe has.
	// Missed ingredients are the ingredients that the recipe has but the user didn't type.
	// Unused ingredients are the ingredients that the user typed but the recipe didn't has.
	const renderRecipes = recipes.map((recipe) => {
		return (
			<div className={styles.searchRecipe} key={recipe.id}>
				<FindRecipe
					recipeId={recipe.id}
					title={recipe.title}
					usedIngredients={recipe.usedIngredients}
					missedIngredients={recipe.missedIngredients}
					unusedIngredients={recipe.unusedIngredients}
				/>
			</div>
		);
	});

	return (
		<div className={styles.transition}>
			<div className={styles.search}>
				<h2>
					Enter comma separated ingredients and click button or press Enter
				</h2>
				<div className={styles.subtitle}></div>
				<input
					value={recipe}
					placeholder="Search for recipes..."
					onChange={(e) => {
						setRecipe(e.target.value);
					}}
					onKeyDown={pressEnterHandler}
				/>
				<div className={styles.buttonWrap}>
					<button className={styles.searchButton} onClick={getRecipes}>
						Search
					</button>
				</div>
			</div>
      <div className={styles.searchContainer}>{renderRecipes}</div>
		</div>
	);
};

export default FindRecipes;
