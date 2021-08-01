import React from 'react';
import { connect } from 'react-redux';
import styles from './Navigation.module.css';
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
  isSignedIn,
  userEmail
}) {

	return (
		<div className={styles.nav}>
			{!isSignedIn && (
        <>
          <div className={styles['nav-login']} onClick={toggleRegisterModal}>
            Register
          </div>			
          <div className={styles['nav-login']} onClick={toggleLoginModal}>
            Login with Email
          </div>			
          <div className={styles['nav-login']} onClick={startLoginGoogle}>
            Login with Google
          </div>
        </>
      )}
			{isSignedIn && (
        <>
          <div className={styles['nav-hello']}>Hello {userEmail}</div>
          <div className={styles['nav-login']} >My Recipes</div>
          <div className={styles['nav-logout']} onClick={startSignOut}>
					Sign out
				  </div>
        </>
      )}

			<RegisterModal />
			<LoginModal />
		</div>
	);
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.userId,
    userEmail: state.auth.userEmail
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
