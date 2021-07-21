import React from 'react';
import { connect } from 'react-redux';
import './Navigation.css';
import {
	startLoginGoogle,
	startSignOut,
	startRegister,
  toggleLoginModal,
  toggleRegisterModal
} from '../../store/actions/authActions';
import LoginModal from '../AuthModals/LoginModal/LoginModal';
import RegisterModal from '../AuthModals/RegisterModal/RegisterModal';

function Navigation({
	startLoginGoogle,
	startSignOut,
  toggleLoginModal,
  toggleRegisterModal,
}) {

	return (
		<div className='nav'>
			<button className='nav-login' onClick={toggleRegisterModal}>
				Register
			</button>
			<button className='nav-login' onClick={toggleLoginModal}>
				Login with Email
			</button>
			<button className='nav-login' onClick={startLoginGoogle}>
				Login with Google
			</button>
			<button className='nav-register' onClick={startSignOut}>
				Sign out
			</button>
			<RegisterModal />
			<LoginModal />
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		startLoginGoogle: () => dispatch(startLoginGoogle()),
		startSignOut: () => dispatch(startSignOut()),
		startRegister: (userName, password) =>
			dispatch(startRegister(userName, password)),
    toggleLoginModal: () => dispatch(toggleLoginModal()),
    toggleRegisterModal: () => dispatch(toggleRegisterModal()),
	};
};

export default connect(null, mapDispatchToProps)(Navigation);
