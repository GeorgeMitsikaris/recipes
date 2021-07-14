import { firebase, googleAuthProvider } from '../../firebase/firebase';

export const startRegister = (userName, password) => {
	return () => {
		console.log(userName, password);
		return firebase.auth().createUserWithEmailAndPassword(userName, password);
	};
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
