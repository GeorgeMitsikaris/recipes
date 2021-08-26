import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import styles from './Navigation.module.css';
import {
	startLoginGoogle,
	startSignOut,
	toggleLoginModal,
	toggleRegisterModal,
} from '../../store/actions/authActions';
import LoginModal from '../Modals/LoginModal/LoginModal';
import RegisterModal from '../Modals/RegisterModal/RegisterModal';

function Navigation() {
	const dispatch = useDispatch();
	const isSignedIn = useSelector((state) => state.auth.userId);
	const userEmail = useSelector((state) => state.auth.userEmail);

	return (
		<div className={styles.nav}>
			{!isSignedIn && (
				<>
					<nav className={styles.showNav}>
						<div
							className={styles.navLogin}
							onClick={() => dispatch(toggleRegisterModal())}
						>
							Register
						</div>
						<div
							className={styles.navLogin}
							onClick={() => dispatch(toggleLoginModal())}
						>
							Login with Email
						</div>
						<div
							className={styles.navLogin}
							onClick={() => dispatch(startLoginGoogle())}
						>
							Login with Google
						</div>
					</nav>
					<div className={styles.showBurger}>
						<FontAwesomeIcon
							icon={faBars}
							className={styles.burgerMenu}
							size='2x'
						></FontAwesomeIcon>
          </div>
				</>
			)}
			{isSignedIn && (
				<>
					<nav className={styles.showNav}>
						<div className={styles.navHello}>Hello {userEmail}</div>
						<NavLink
							className={styles.navSearch}
							to={{
								pathname: '/recipeForm',
								state: {
									previousPath: '/',
									isEditMode: false,
								},
							}}
						>
							Create a recipe
						</NavLink>
						<NavLink exact className={styles.navSearch} to='/'>
							Search for recipes
						</NavLink>
						<NavLink exact to='/myRecipes' className={styles.navSearch}>
							My recipes
						</NavLink>
						<Link
							to='/'
							className={styles.navLogout}
							onClick={() => dispatch(startSignOut())}
						>
							Sign out
						</Link>
					</nav>
					<div className={styles.showBurger}>
						<div className={styles.navHello}>Hello {userEmail}</div>
						<FontAwesomeIcon
							icon={faBars}
							className={styles.burgerMenu}
							size='2x'
						></FontAwesomeIcon>
					</div>
				</>
			)}
			<RegisterModal />
			<LoginModal />
		</div>
	);
}

export default Navigation;
