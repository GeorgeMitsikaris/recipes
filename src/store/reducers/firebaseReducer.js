import { STORE_RECIPE } from '../actions/actionTypes';

const initialState = {
  recipe: {},
}

export const firebaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_RECIPE:
      return state;
    default: return state;
  }
}