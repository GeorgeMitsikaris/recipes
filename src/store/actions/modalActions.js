import { SET_BURGER_MODAL_STATE, SET_RECIPES_FORM_MODAL_STATE } from '../actions/actionTypes';

export const setBurgerModalState = (payload) => {
  return {
    type: SET_BURGER_MODAL_STATE,
    payload
  }
}

export const setRecipesFormModalState = (payload) => {
  return {
    type: SET_RECIPES_FORM_MODAL_STATE,
    payload
  }
}