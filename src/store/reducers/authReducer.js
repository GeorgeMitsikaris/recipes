import { GET_USER_ID, TOGGLE_LOGIN_MODAL, TOGGLE_REGISTER_MODAL, SET_ERROR_MESSAGE, SIGN_OUT } from '../actions/actionTypes';

const initialState = {
  userId: '',
  userEmail: '',
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  errorMessage: '',
  isUserLoggedIn: false,
}

export const authReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_USER_ID: return {...state, userId: action.payload.uid, userEmail: action.payload.email, isUserLoggedIn: true}
    case TOGGLE_LOGIN_MODAL: return {...state, isLoginModalOpen: !state.isLoginModalOpen}
    case TOGGLE_REGISTER_MODAL: return {
			...state,
			isRegisterModalOpen: !state.isRegisterModalOpen,
		};
    case SET_ERROR_MESSAGE: return {...state, errorMessage: action.payload}
    case SIGN_OUT: return {...state, userId: ''}
    default: return state;
  }
}