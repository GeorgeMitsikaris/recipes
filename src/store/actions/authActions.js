import { firebase, googleAuthProvider } from '../../firebase/firebase';

export const startLoginGoogle = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
}

export const startLoginEmail = () => {
	return () => {
		return firebase.auth().signInWithEmailAndPassword('test@test.com','test11');
	};
};

export const startSignOut = () => {
  return () => {
    return firebase.auth().signOut()
  }
}
