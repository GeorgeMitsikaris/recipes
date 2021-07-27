import { firebase, googleAuthProvider } from '../../firebase/firebase';
import {
	GET_USER_ID,
	TOGGLE_LOGIN_MODAL,
	TOGGLE_REGISTER_MODAL,
	SET_ERROR_MESSAGE,
	SIGN_OUT,
} from '../actions/actionTypes';

export const startRegister = (userName, password) => async (dispatch) => {
	try {
		const data = await firebase
			.auth()
			.createUserWithEmailAndPassword(userName, password);
		dispatch({ type: GET_USER_ID, payload: data.user.uid });
	} catch (error) {
		dispatch(
			setErrorMessage(
				error.code.substring(error.code.indexOf('/') + 1).replaceAll('-', ' ')
			)
		);
	}
};

export const startLoginGoogle = () => async (dispatch) => {
	const data = await firebase.auth().signInWithPopup(googleAuthProvider);
	dispatch({ type: GET_USER_ID, payload: data.user.uid });
};

export const startLoginEmail = (userName, password) => async (dispatch) => {
	try {
		const data = await firebase
			.auth()
			.signInWithEmailAndPassword(userName, password);
		dispatch({ type: GET_USER_ID, payload: data.user.uid });
		dispatch({ type: TOGGLE_LOGIN_MODAL });
	} catch (error) {
		dispatch(
			setErrorMessage(
				error.code.substring(error.code.indexOf('/') + 1).replaceAll('-', ' ')
			)
		);
	}
};

export const startSignOut = () => async dispatch =>{
  try{
		await firebase.auth().signOut();
    dispatch({type: SIGN_OUT})
  } catch (error) {

  }
};

export const toggleLoginModal = () => {
	return {
		type: TOGGLE_LOGIN_MODAL,
	};
};

export const toggleRegisterModal = () => {
	return {
		type: TOGGLE_REGISTER_MODAL,
	};
};

export const setErrorMessage = (message) => {
	return {
		type: SET_ERROR_MESSAGE,
		payload: message,
	};
};
