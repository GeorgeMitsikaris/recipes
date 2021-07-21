import { firebase, googleAuthProvider } from '../../firebase/firebase';
import { GET_USER_ID, TOGGLE_LOGIN_MODAL, TOGGLE_REGISTER_MODAL } from '../actions/actionTypes';

export const startRegister = (userName, password) => async dispatch  => {
  const data = await firebase.auth().createUserWithEmailAndPassword(userName, password);
	dispatch({type: GET_USER_ID, payload: data.user.uid})
};

export const startLoginGoogle = () => async dispatch => {
  const data = await firebase.auth().signInWithPopup(googleAuthProvider);
	dispatch({ type: GET_USER_ID, payload: data.user.uid });
};

export const startLoginEmail = (userName, password) => async dispatch => { 
  const data = await firebase.auth().signInWithEmailAndPassword(userName, password);
  console.log(data);
  dispatch({type: GET_USER_ID, payload: data.user.uid})
};

export const startSignOut = () => {
  return () => {
    return firebase.auth().signOut()
  }
}

export const toggleLoginModal = () => {
  return {
		type: TOGGLE_LOGIN_MODAL,
	};
}

export const toggleRegisterModal = () => {
	return {
		type: TOGGLE_REGISTER_MODAL,
	};
};
