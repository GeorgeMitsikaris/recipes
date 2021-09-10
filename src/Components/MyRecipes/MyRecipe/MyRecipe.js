import React from "react";
import { v4 as uuid } from "uuid";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./MyRecipe.module.css";
import { setRecipesFormModalState, setDeleteRecipeModalState} from "../../../store/actions/modalActions";
import { getRecipeToDelete } from '../../../store/actions/recipeActions';
import DeleteRecipeModal from "../../Modals/DeleteRecipeModal/DeleteRecipeModal";

function MyRecipe({ recipe, deleteRecipe }) {
	const dispatch = useDispatch();
	const ingredients = recipe.ingredients.map((ingredient) => {
		const amount = Math.round(100 * (ingredient.amount + Number.EPSILON)) / 100;
		return (
			<tr key={uuid()} className={styles.recipeIngredients}>
				<td className={styles.ingredientName}>{ingredient.name}</td>
				<td className={styles.ingredientAmount}>{amount}</td>
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
		<>
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
					<button className={styles.editButton} type="button">
						<NavLink
							to={{
								pathname: "/recipeForm",
								state: {
									recipe,
									previousPath: "/myRecipes",
									isEditMode: true,
								},
							}}
							onClick={() => dispatch(setRecipesFormModalState(true))}
						>
							Edit recipe
						</NavLink>
					</button>
					<button
						className={styles.deleteButton}
						type="button"
						onClick={() => {
							dispatch(setDeleteRecipeModalState(true))
							dispatch(getRecipeToDelete(recipe));
						}}
					>
						Delete recipe
					</button>
				</div>
			</div>
			<DeleteRecipeModal />
		</>
	);
}

export default MyRecipe;
