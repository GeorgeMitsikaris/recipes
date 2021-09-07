import { SET_BURGER_MODAL_STATE, SET_RECIPES_FORM_MODAL_STATE, SET_DELETE_RECIPE_MODAL_STATE } from '../actions/actionTypes';

const initialState = {
  isBurgerModalOpen: false,
  isRecipesFormModalOpen: true,
  isDeleteRecipeModalOpen: false,
}

export const modalReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_BURGER_MODAL_STATE: {
      return {
        ...state, 
        isBurgerModalOpen: action.payload
      }
    }
    case SET_RECIPES_FORM_MODAL_STATE: {
      return {
        ...state, 
        isRecipesFormModalOpen: action.payload
      }
    }
    case SET_DELETE_RECIPE_MODAL_STATE: {
      return {
        ...state, 
        isDeleteRecipeModalOpen: action.payload
      }
    }
    default: return state;
  }
}
