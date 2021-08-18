import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';
import {
	startLoginGoogle,
	startSignOut,
  toggleLoginModal,
  toggleRegisterModal
} from '../../store/actions/authActions';
import LoginModal from '../AuthModals/LoginModal/LoginModal';
import RegisterModal from '../AuthModals/RegisterModal/RegisterModal';

function Navigation() {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(state => state.auth.userId);
  const userEmail = useSelector(state => state.auth.userEmail);
	return (
		<div className={styles.nav}>
			{!isSignedIn && (
				<>
					<div
						className={styles['nav-login']}
						onClick={() => dispatch(toggleRegisterModal())}
					>
						Register
					</div>
					<div
						className={styles['nav-login']}
						onClick={() => dispatch(toggleLoginModal())}
					>
						Login with Email
					</div>
					<div
						className={styles['nav-login']}
						onClick={() => dispatch(startLoginGoogle())}
					>
						Login with Google
					</div>
				</>
			)}
			{isSignedIn && (
				<>
					<div className={styles['nav-hello']}>Hello {userEmail}</div>
					<NavLink className={styles['nav-search']} to={{
              pathname: '/recipeForm',
              state: { 
                previousPath: '/',
                isEditMode: false
              }
            }}>
						Create a recipe
					</NavLink>
					<NavLink className={styles['nav-search']} to='/'>
						Search for recipes
					</NavLink>
					<NavLink to='/myRecipes' className={styles['nav-search']}>
						My recipes
					</NavLink>
					<NavLink
						to='/'
						className={styles['nav-logout']}
						onClick={() => dispatch(startSignOut())}
					>
						Sign out
					</NavLink>
				</>
			)}

			<RegisterModal />
			<LoginModal />
		</div>
	);
}

export default Navigation;
