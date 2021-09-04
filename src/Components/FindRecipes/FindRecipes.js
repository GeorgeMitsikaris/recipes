import React, { useState } from "react";
import axios from "axios";

import styles from "./FindRecipes.module.css";
import FindRecipe from "./FindRecipe/FindRecipe";

const FindRecipes = () => {
	const [recipe, setRecipe] = useState("");
	const [recipes, setRecipes] = useState([]);

	const pressEnterHandler = (e) => {
		if (e.code === "Enter" || e.code === "NumpadEnter") {
			getRecipes();
		}
	};

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

	const renderRecipes = recipes.map((recipe, i) => {
		return (
			<div className={styles.searchRecipe} key={recipe.id}>
				<FindRecipe
					recipeId={recipe.id}
					title={recipe.title}
					missedIngredients={recipe.missedIngredients}
					usedIngredients={recipe.usedIngredients}
					unusedIngredients={recipe.unusedIngredients}
				/>
			</div>
		);
	});

	return (
		<div className={styles.transition}>
			<div className={styles.search}>
				<h1>
					Enter comma separated ingredients and click button or press Enter
				</h1>
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
