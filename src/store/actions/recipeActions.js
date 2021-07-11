import axios from 'axios';
import _ from 'lodash';
import database from '../../firebase/firebase';
import { STORE_RECIPE } from './actionTypes';

import { GET_RECIPE, CLOSE_MODAL } from './actionTypes';

export const fetchRecipe = (recipeId) => async dispatch => {
	const { data } = await axios.get(
		`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.REACT_APP_SPOONACULAR}`
	);
  const recipeData = _.pick(data, ['extendedIngredients', 'title', 'id', 'analyzedInstructions']);
  dispatch({type: GET_RECIPE, payload: recipeData});
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL, 
  }
}

export const storeRecipe = () => async (dispatch, getState) => {
	database
		.ref('recipes')
		.push(getState().recipes.selectedRecipe)
		.then((ref) => {
			dispatch({ type: STORE_RECIPE });
		});
};