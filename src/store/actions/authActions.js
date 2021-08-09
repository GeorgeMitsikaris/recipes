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
		dispatch(getUserIdAndEmail(data.user.uid, data.user.email));
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
	dispatch(getUserIdAndEmail(data.user.uid, data.user.email));
};

export const startLoginEmail = (userName, password) => async (dispatch) => {
	try {
		const data = await firebase
			.auth()
			.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			.then(() => {
				return firebase.auth().signInWithEmailAndPassword(userName, password);
			});
		dispatch(getUserIdAndEmail(data.user.uid, data.user.email));
		dispatch({ type: TOGGLE_LOGIN_MODAL });
	} catch (error) {
		if (error.code) {
			dispatch(
				setErrorMessage(
					error.code.substring(error.code.indexOf('/') + 1).replaceAll('-', ' ')
				)
			);
		}
    console.log(error);
	}
};

export const startSignOut = () => async (dispatch) => {
	try {
		await firebase.auth().signOut();
		dispatch({ type: SIGN_OUT });
	} catch (error) {}
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

export const getUserIdAndEmail = (uid, email) => {
	return {
		type: GET_USER_ID,
		payload: {
      uid, email
    }
	};
};
