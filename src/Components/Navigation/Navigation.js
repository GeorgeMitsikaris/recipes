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
import BurgerModal from '../Modals/BurgerModal/BurgerModal';
import { setModalState } from '../../store/actions/modalActions';

function Navigation() {
	const dispatch = useDispatch();
	const isSignedIn = useSelector((state) => state.auth.userId);
	const userEmail = useSelector((state) => state.auth.userEmail);

	return (
		<div className={styles.nav}>
			{!isSignedIn && (
				<>
					<nav className={styles.navAbout}>
						<NavLink to='/search'></NavLink>
					</nav>
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
							onClick={() => dispatch(setModalState(true))}
						></FontAwesomeIcon>
					</div>
				</>
			)}
			{isSignedIn && (
				<>
					<div className={styles.navHello}>Hello {userEmail}</div>
					<nav className={styles.showNav}>
						<NavLink
							className={styles.navSearch}
							to={{
								pathname: '/recipeForm',
								state: {
									previousPath: '/search',
									isEditMode: false,
								},
							}}
						>
							Create a recipe
						</NavLink>
						<NavLink className={styles.navSearch} to='/search'>
							Search for recipes
						</NavLink>
						<NavLink to='/myRecipes' className={styles.navSearch}>
							My recipes
						</NavLink>
						<Link
							to='/search'
							className={styles.navLogout}
							onClick={() => dispatch(startSignOut())}
						>
							Sign out
						</Link>
					</nav>
					<div className={styles.showBurger}>
						<FontAwesomeIcon
							onClick={() => dispatch(setModalState(true))}
							icon={faBars}
							className={styles.burgerMenu}
							size='2x'
						></FontAwesomeIcon>
					</div>
				</>
			)}
			<RegisterModal />
			<LoginModal />
			<BurgerModal isSignedIn={isSignedIn} />
		</div>
	);
}

export default Navigation;
