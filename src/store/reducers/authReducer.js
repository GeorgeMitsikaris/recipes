import { GET_USER_ID, TOGGLE_LOGIN_MODAL, TOGGLE_REGISTER_MODAL } from '../actions/actionTypes';

const initialState = {
  userId: '',
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
}

export const authReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_USER_ID: return {...state, userId: action.payload}
    case TOGGLE_LOGIN_MODAL: return {...state, isLoginModalOpen: !state.isLoginModalOpen}
    case TOGGLE_REGISTER_MODAL: return {
			...state,
			isRegisterModalOpen: !state.isRegisterModalOpen,
		};
    default: return state;
  }
}