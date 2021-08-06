import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import styles from './MyRecipes.module.css';
import database from '../../firebase/firebase';

function MyRecipes() {
	const [myRecipes, setMyRecipes] = useState([]);
  const userId = useSelector(state => state.auth.userId);

	useEffect(() => {
		if (userId) {
			database
				.ref(userId)
				.once('value')
				.then((snapshot) => {
					const recipes = [];
					snapshot.forEach((snapshotChild) => {
						recipes.push(snapshotChild.val());
					});
					recipes.map((recipe) => {
						const ings = recipe.extendedIngredients.map((ing) => {
							return ing.name;
						});
						const steps = recipe.analyzedInstructions[0].steps.map((step) => {
							return step.step;
						});
						return {
							title: recipe.title,
							ingredients: ings,
							readyInMinutes: recipe.readyInMinutes,
							steps,
						};
					});
					setMyRecipes(recipes);
				});
		}
	}, [userId]);

	const renderMyRecipes = myRecipes.map((recipe) => {
		console.log(recipe);
		const ingredients = recipe.extendedIngredients.map((ingredient) => {
			return (
				<tr key={uuid()} className={styles.recipeIngredients}>
					<td className={styles.ingredientName}>{ingredient.name}</td>
					<td className={styles.ingredientAmount}>{ingredient.amount}</td>
					<td className={styles.ingredientUnit}>{ingredient.unit}</td>
				</tr>
			);
		});
		return (
			<div className={styles.recipeContainer} key={uuid()}>
				<div className={styles.recipeHeader}>
          <div className={styles.titleText}>{recipe.title}</div>
          <button className={styles.titleButton} type="button">Edit Title</button>
        </div>
				<table className={styles.table}>
					<thead>
						<tr className={styles.tableHeader}>
							<th>Ingredients</th>
							<th>Amount</th>
							<th>Unit</th>
						</tr>
					</thead>
          <tbody>
					  {ingredients}
          </tbody>
				</table>
			</div>
		);
	});

	return (
		<>
			<div className={styles.recipes}>{renderMyRecipes}</div>
		</>
	);
}

export default MyRecipes;
