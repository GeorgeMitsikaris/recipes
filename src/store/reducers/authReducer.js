import { GET_USER_ID } from '../actions/actionTypes';

const initialState = {
  userId: ''
}

export const authReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_USER_ID: return {...state, userId: action.payload}
    default: return state;
  }
}