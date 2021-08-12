import axios from 'axios';
import _ from 'lodash';
import database from '../../firebase/firebase';
import { STORE_RECIPE } from './actionTypes';

import { GET_RECIPE, CLOSE_MODAL } from './actionTypes';

export const fetchRecipe = (recipeId) => async (dispatch) => {
	const { data } = await axios.get(
		`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.REACT_APP_SPOONACULAR}`
	);

	const ingredients = _.map(data.extendedIngredients, (ings) => {
		return { name: ings.name, amount: ings.amount, unit: ings.unit };
	});

	const instructions = _.map(data.analyzedInstructions[0].steps, (step) => {
		return step.step;
	});

	const recipeData = _.pick(data, [
		'extendedIngredients',
		'title',
		'id',
		'analyzedInstructions',
		'readyInMinutes',
	]);

  const recipe = {...recipeData, extendedIngredients: ingredients, analyzedInstructions: instructions}
	dispatch({ type: GET_RECIPE, payload: recipe });
};

// export const createRecipe = recipe => {
//   return {
//     type: GET_RECIPE, payload: recipe
//   }
// }

export const storeRecipe = () => async (dispatch, getState) => {
	const userId = getState().auth.userId;
	database
		.ref(userId)
		.child(getState().recipes.selectedRecipe.title)
		.set(getState().recipes.selectedRecipe)
		.then(() => {
			dispatch({ type: STORE_RECIPE });
		});
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};
