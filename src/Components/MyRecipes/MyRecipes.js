import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import database from "../../firebase/firebase";
import { toast } from "react-toastify";

import styles from "./MyRecipes.module.css";
import MyRecipe from "./MyRecipe/MyRecipe";
import { DeleteRecipeContext } from "../../storeContext/DeleteRecipeContext";

function MyRecipes() {
	const [myRecipes, setMyRecipes] = useState([]);
	const userId = useSelector((state) => state.auth.userId);

	// We use the useCallback hook because the 'fetchRecipes' function is a dependency of the useEffect hook (line 51) and without it
	// the component will rerender infinitely
	const fetchRecipes = useCallback((userId) => {
		// firebase documentation -> https://firebase.google.com/docs/reference/js/v8/firebase.database.Reference
		database
			.ref(userId)
			.once("value")
			.then((snapshot) => {
				const recipes = [];
				snapshot.forEach((snapshotChild) => {
					recipes.push(snapshotChild.val());
				});
				const rsps = recipes.map((recipe) => {
					return {
						title: recipe.title,
						ingredients: recipe.extendedIngredients,
						readyInMinutes: recipe.readyInMinutes,
						steps: recipe.analyzedInstructions,
						id: recipe.id,
						servings: recipe.servings,
					};
				});
				setMyRecipes(rsps);
			});
	}, []);

	// firebase documentation -> https://firebase.google.com/docs/reference/js/v8/firebase.database.Reference
	const deleteRecipe = async (recipeId) => {
		database
			.ref(`${userId}/${recipeId}`)
			.remove()
			.then(() => {
				fetchRecipes(userId);
				toast.info("Recipe deleted successfully");
			})
			.catch((err) => {
				toast.error("We couldn't delete your recipe. Something went wrong");
			});
	};

	useEffect(() => {
		if (userId) {
			fetchRecipes(userId);
		}
	}, [userId, fetchRecipes]);

	// We pass the recipe as a prop to MyRecipe component
	const renderMyRecipes = myRecipes.map((recipe) => (
		<MyRecipe key={recipe.id} recipe={recipe} />
	));

	return (
		// We use the React Context api because we want to pass the deleteRecipe method to the DeleteRecipeModal which is grandchild to this component
		<DeleteRecipeContext.Provider value={deleteRecipe}>
			<div className={styles.transition}>
				<div className={styles.recipes}>{renderMyRecipes}</div>
			</div>
		</DeleteRecipeContext.Provider>
	);
}

export default MyRecipes;
