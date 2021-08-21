import React, { useState, useEffect ,useCallback } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import styles from './MyRecipes.module.css';
import database from '../../firebase/firebase';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    database.ref(`${userId}/${recipeId}`).remove().then(() => {
      fetchRecipes(userId);
      toast.error('Recipe deleted successfully');
    })
  }

	useEffect(() => {
		if (userId) {
      fetchRecipes(userId);
		}
	}, [userId, fetchRecipes]);

	const renderMyRecipes = myRecipes.map((recipe) => {		
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
					<button
						className={styles.editButton}
						type='button'
					>
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
					<button className={styles.deleteButton} type='button' onClick={() => deleteRecipe(recipe.id)}>
						Delete recipe
					</button>
				</div>
			</div>
		);
	});

	return (
		<div className={styles.transition}>
			<div className={styles.recipes}>{renderMyRecipes}</div>
		</div>
	);
}

export default MyRecipes;
