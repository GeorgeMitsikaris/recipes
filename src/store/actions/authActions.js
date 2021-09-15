import { toast } from 'react-toastify';
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
		// More info -> https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
		const data = await firebase
			.auth()
			.createUserWithEmailAndPassword(userName, password)
      .then(() => {
        toast.success('You are successfully registered')
      })
      .catch(() => {
        toast.error('There was a problem registering you')
      })
		dispatch(getUserIdAndEmail(data.user.uid, data.user.email));
	} catch (error) {
		// The error codes are of type auth/account-exists-with-different-credential, auth/auth-domain-config-required etc.
		// so with the following code we get a meaningful error message
		dispatch(
			setErrorMessage(
				error?.code?.substring(error.code.indexOf('/') + 1).replaceAll('-', ' ')
			)
		);
	}
};

// More info -> https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithpopup
export const startLoginGoogle = () => async (dispatch) => {
	const data = await firebase
		.auth()
		.signInWithPopup(googleAuthProvider)
		.then(() => {
			toast.success('You are successfully logged in');
		})
		.catch(() => {
			toast.error('There was a problem loging you');
		});
	dispatch(getUserIdAndEmail(data?.user.uid, data?.user.email));
};

// More info https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithpopup
export const startLoginEmail = (userName, password) => async (dispatch) => {
	try {
		const data = await firebase
			.auth()
			.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			.then(() => {
        toast.success('You are successfully logged in');
				return firebase.auth().signInWithEmailAndPassword(userName, password);
			});
		dispatch(getUserIdAndEmail(data.user.uid, data.user.email));
		dispatch({ type: TOGGLE_LOGIN_MODAL });
	} catch (error) {
    toast.error('There was a problem loging you');
		if (error.code) {
			dispatch(
				setErrorMessage(
					error.code.substring(error.code.indexOf('/') + 1).replaceAll('-', ' ')
				)
			);
		}
	}
};

export const startSignOut = () => async (dispatch) => {
	try {
		await firebase.auth().signOut().then(() => {
      toast.info('You are signed out')
    })
		dispatch({ type: SIGN_OUT });
	} catch (error) {
    toast.error('There was a problem signing you out');
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

export const getUserIdAndEmail = (uid, email) => {
	return {
		type: GET_USER_ID,
		payload: {
      uid, email
    }
	};
};
