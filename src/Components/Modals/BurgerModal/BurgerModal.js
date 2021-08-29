import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './BurgerModal.module.css';
import {
	startLoginGoogle,
	startSignOut,
	toggleLoginModal,
	toggleRegisterModal,
} from '../../../store/actions/authActions';
import { setModalState } from '../../../store/actions/modalActions';

function BurgeModal({ isSignedIn }) {
	const dispatch = useDispatch();
	const isModalOpen = useSelector((state) => state.modal.isModalOpen);

	if (isSignedIn) {
		return (
			<Modal
				isOpen={isModalOpen}
				closeTimeoutMS={500}
				onRequestClose={() => dispatch(setModalState(false))}
				className={styles.modalContent}
			>
				<nav className={styles.showNavMobile}>
					<Link
						className={styles.navSearchMobile}
						to={{
							pathname: '/recipeForm',
							state: {
								previousPath: '/',
								isEditMode: false,
							},
						}}
					>
						Create a recipe
					</Link>
					<Link to='/' exact className={styles.navSearchMobile}>
						Search for recipes
					</Link>
					<Link exact to='/myRecipes' className={styles.navSearchMobile}>
						My recipes
					</Link>
					<Link
						to='/'
						className={styles.navLogoutMobile}
						onClick={() => dispatch(startSignOut())}
					>
						Sign out
					</Link>
				</nav>
			</Modal>
		);
	} else {
		return (
			<Modal
				isOpen={isModalOpen}
				closeTimeoutMS={500}
				onRequestClose={() => dispatch(setModalState(false))}
				className={styles.modalContent}
			>
				<nav className={styles.showNavMobile}>
					<div
						className={styles.navLoginMobile}
						onClick={() => {
							dispatch(toggleRegisterModal());
							dispatch(setModalState(false));
						}}
					>
						Register
					</div>
					<div
						className={styles.navLoginMobile}
						onClick={() => {
							dispatch(toggleLoginModal());
							dispatch(setModalState(false));
						}}
					>
						Login with Email
					</div>
					<div
						className={styles.navLoginMobile}
						onClick={() => dispatch(startLoginGoogle())}
					>
						Login with Google
					</div>
				</nav>
			</Modal>
		);
	}
}

export default BurgeModal;
