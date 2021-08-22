import React from 'react';
import { v4 as uuid } from 'uuid';
import { NavLink } from 'react-router-dom';

import styles from './MyRecipe.module.css';

function MyRecipe({ recipe, deleteRecipe }) {
	const ingredients = recipe.ingredients.map((ingredient) => {
		return (
			<tr key={uuid()} className={styles.recipeIngredients}>
				<td className={styles.ingredientName}>{ingredient.name}</td>
				<td className={styles.ingredientAmount}>{ingredient.amount}</td>
				<td className={styles.ingredientUnit}>{ingredient.unit}</td>
			</tr>
		);
	});
	const renderInstructions = recipe.steps.map((step) => (
		<div key={uuid()} className={styles.step}>
			{step}
		</div>
	));
	return (
		<div className={styles.recipeContainer} key={uuid()}>
			<div className={styles.recipeHeader}>
				<div className={styles.titleText}>{recipe.title}</div>
			</div>
			<table className={styles.table}>
				<thead>
					<tr className={styles.tableHeader}>
						<th>Ingredients</th>
						<th>Amount</th>
						<th>Unit</th>
					</tr>
				</thead>
				<tbody>{ingredients}</tbody>
			</table>
			<div className={styles.steps}>
				<div className={styles.headerWrap}>
					<div className={styles.stepsHeaderLeft}>Instructions</div>
					<div className={styles.stepsHeaderRight}>
						<em>Ready in {recipe.readyInMinutes} minutes</em>
					</div>
				</div>
				{renderInstructions}
			</div>
			<div className={styles.actions}>
				<button className={styles.editButton} type='button'>
					<NavLink
						to={{
							pathname: '/recipeForm',
							state: {
								recipe,
								previousPath: '/myRecipes',
								isEditMode: true,
							},
						}}
					>
						Edit recipe
					</NavLink>
				</button>
				<button
					className={styles.deleteButton}
					type='button'
					onClick={() => deleteRecipe(recipe.id)}
				>
					Delete recipe
				</button>
			</div>
		</div>
	);
}

export default MyRecipe;
