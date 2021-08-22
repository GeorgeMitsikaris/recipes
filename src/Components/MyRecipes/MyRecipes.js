import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import database from '../../firebase/firebase';
import { toast } from 'react-toastify';

import styles from './MyRecipes.module.css';
import MyRecipe from './MyRecipe/MyRecipe';

function MyRecipes() {
	const [myRecipes, setMyRecipes] = useState([]);
	const userId = useSelector((state) => state.auth.userId);

	const fetchRecipes = useCallback((userId) => {
		database
			.ref(userId)
			.once('value')
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
					};
				});
				setMyRecipes(rsps);
			});
	}, []);
	const deleteRecipe = async (recipeId) => {
		database
			.ref(`${userId}/${recipeId}`)
			.remove()
			.then(() => {
				fetchRecipes(userId);
				toast.info('Recipe deleted successfully');
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

	const renderMyRecipes = myRecipes.map((recipe) => (
		<MyRecipe key={recipe.id} recipe={recipe} deleteRecipe={deleteRecipe} />
	));

	return (
		<div className={styles.transition}>
			<div className={styles.recipes}>{renderMyRecipes}</div>
		</div>
	);
}

export default MyRecipes;
