import { firebase, googleAuthProvider } from '../../firebase/firebase';
import { GET_USER_ID } from '../actions/actionTypes';

export const startRegister = (userName, password) => async dispatch  => {
  const data = await firebase.auth().createUserWithEmailAndPassword(userName, password);
  console.log(data);
	dispatch({type: GET_USER_ID, payload: data.user.uid})
};

export const startLoginGoogle = () => {
	return () => {
		return firebase.auth().signInWithPopup(googleAuthProvider);
	};
};

export const startLoginEmail = (userName, password) => {
	return () => {
		return firebase.auth().signInWithEmailAndPassword(userName, password);
	};
};

export const startSignOut = () => {
  return () => {
    return firebase.auth().signOut()
  }
}
