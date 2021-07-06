import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBiFFpbKRdWHwT4hfcqbbsVjNQe29-CrIo',
	authDomain: 'spoonacular-george-m.firebaseapp.com',
	databaseURL:
		'https://spoonacular-george-m-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'spoonacular-george-m',
	storageBucket: 'spoonacular-george-m.appspot.com',
	messagingSenderId: '262138830065',
	appId: '1:262138830065:web:c11fd550a557ec874e9d50',
};
firebase.initializeApp(firebaseConfig);

firebase.database().ref().set({
	name: 'George Mitsikaris',
});
