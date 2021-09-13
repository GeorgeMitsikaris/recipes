import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./BurgerModal.module.css";
import {
	startLoginGoogle,
	startSignOut,
	toggleLoginModal,
	toggleRegisterModal,
} from "../../../store/actions/authActions";
import { setBurgerModalState, setRecipesFormModalState } from "../../../store/actions/modalActions";

function BurgerModal({ isSignedIn }) {
	const dispatch = useDispatch();
	const isBurgerModalOpen = useSelector((state) => state.modal.isBurgerModalOpen);

	// We render different content based on if the user is signed in
	// For more info about React Modal check the documentation -> https://reactcommunity.org/react-modal/
	if (isSignedIn) {
		return (
			<Modal
				isOpen={isBurgerModalOpen}
				closeTimeoutMS={500}
				// We use redux to dispatch an action that closes the modal
				onRequestClose={() => dispatch(setBurgerModalState(false))}
				className={styles.modalContent}
				overlayClassName={styles.overlay}
			>
				<nav className={styles.showNavMobile}>
					<Link
						className={styles.navMobile}
						to={{
							pathname: "/recipeForm",
							state: {
								previousPath: "/search",
								isEditMode: false,
							},
						}}
						onClick={() =>{
							dispatch(setBurgerModalState(false))
							dispatch(setRecipesFormModalState(true))
						}}
					>
						Create a recipe
					</Link>
					<Link
						to="/search"
						className={styles.navMobile}
						onClick={() => dispatch(setBurgerModalState(false))}
					>
						Search for recipes
					</Link>
					<Link
						to="/myRecipes"
						className={styles.navMobile}
						onClick={() => dispatch(setBurgerModalState(false))}
					>
						My recipes
					</Link>
					<Link
						to="/search"
						className={styles.navMobile}
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
				isOpen={isBurgerModalOpen}
				closeTimeoutMS={500}
				onRequestClose={() => dispatch(setBurgerModalState(false))}
				className={styles.modalContent}
				overlayClassName={styles.overlay}
			>
				<nav className={styles.showNavMobile}>
					<div
						className={styles.navMobile}
						onClick={() => {
							// We open the register modal and we close the burger modal
							dispatch(toggleRegisterModal());
							dispatch(setBurgerModalState(false));
						}}
					>
						Register
					</div>
					<div
						className={styles.navMobile}
						onClick={() => {
							// We open the login modal and we close the burger modal
							dispatch(toggleLoginModal());
							dispatch(setBurgerModalState(false));
						}}
					>
						Login with Email
					</div>
					<div
						className={styles.navMobile}
						onClick={() => dispatch(startLoginGoogle())}
					>
						Login with Google
					</div>
				</nav>
			</Modal>
		);
	}
}

export default BurgerModal;
