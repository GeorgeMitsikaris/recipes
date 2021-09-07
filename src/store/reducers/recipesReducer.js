import { GET_RECIPE, CLOSE_MODAL, STORE_RECIPE, RECIPE_TO_DELETE } from '../actions/actionTypes';

const initialState = {
  selectedRecipe: {},
  isModalOpen: false,
	recipeToDelete: {},
}

export const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
		case GET_RECIPE:
			return { ...state, selectedRecipe: action.payload, isModalOpen: true };
		case STORE_RECIPE:
			return { ...state, isModalOpen: false };
		case CLOSE_MODAL:
			return { ...state, isModalOpen: false };
		case RECIPE_TO_DELETE:
			return {...state, recipeToDelete: action.payload }
		default:
			return state;
	}
}