import axios from 'axios';
import _ from 'lodash';
import database from '../../firebase/firebase';
import { toast } from "react-toastify";

import { STORE_RECIPE } from './actionTypes';
import { GET_RECIPE, CLOSE_MODAL, RECIPE_TO_DELETE } from './actionTypes';

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

export const storeRecipe = () => async (dispatch, getState) => {
	const userId = getState().auth.userId;
	database
		.ref(userId)
		.child(getState().recipes.selectedRecipe.id)
		.set(getState().recipes.selectedRecipe)
		.then(() => {
			dispatch({ type: STORE_RECIPE });
			toast.success('Recipe saved successfully');
		})
		.catch(() => {
			toast.error('There was a problem saving recipe')
		})
};

export const getRecipeToDelete = (recipe) => {
	return { 
		type: RECIPE_TO_DELETE,
		payload: recipe
	}
}

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};
