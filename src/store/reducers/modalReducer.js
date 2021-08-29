import { SET_MODAL_STATE } from '../actions/actionTypes';

const initialState = {
  isModalOpen: false
}

export const modalReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_MODAL_STATE: {
      return {
        ...state, 
        isModalOpen: action.payload
      }
    }
    default: return state;
  }
}
