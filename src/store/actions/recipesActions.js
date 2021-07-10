import axios from 'axios';
import _ from 'lodash';

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
