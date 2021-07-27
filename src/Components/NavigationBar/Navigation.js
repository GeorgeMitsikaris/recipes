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
  isSignedIn
}) {

	return (
		<div className='nav'>
			{ 
        !isSignedIn && <div className='nav-login' onClick={toggleRegisterModal}>
          Register
        </div>
      }
      {
        !isSignedIn && <div className='nav-login' onClick={toggleLoginModal}>
          Login with Email
        </div>
      }
			{
        !isSignedIn && <div className='nav-login' onClick={startLoginGoogle}>
          Login with Google
        </div>
      }
			{
        isSignedIn && <div className='nav-logout' onClick={startSignOut}>
          Sign out
        </div>
      }
		
			<RegisterModal />
			<LoginModal />
		</div>
	);
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.userId
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
