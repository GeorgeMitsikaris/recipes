import React from 'react';
import { connect } from 'react-redux';
import './Navigation.css';
import { firebase } from '../../firebase/firebase';
import { startLoginGoogle, startLoginEmail, startSignOut } from '../../store/actions/authActions';

function Navigation({startLoginGoogle, startLoginEmail, startSignOut}) {
  firebase.auth().onAuthStateChanged((user) => {
		if (user) console.log('Logged In');
		else console.log('Not logged in');
	});
  return (
		<div className='nav'>
			<button className='nav-login' onClick={startLoginEmail}>
				Login with Email
			</button>
			<button className='nav-login' onClick={startLoginGoogle}>Login with Google</button>
      <button className='nav-register' onClick={startSignOut}>Sign out</button>
		</div>
	);
}

const mapDispatchToProps = dispatch => {
  return {
		startLoginGoogle: () => dispatch(startLoginGoogle()),
		startLoginEmail: () => dispatch(startLoginEmail()),
		startSignOut: () => dispatch(startSignOut()),
	};
}

export default connect(null, mapDispatchToProps)(Navigation);
;