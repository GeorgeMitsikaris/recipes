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

	if (isSignedIn) {
		return (
			<Modal
				isOpen={isBurgerModalOpen}
				closeTimeoutMS={500}
				onRequestClose={() => dispatch(setBurgerModalState(false))}
				className={styles.modalContent}
				overlayClassName={styles.overlay}
			>
				<nav className={styles.showNavMobile}>
					<Link
						className={styles.navSearchMobile}
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
						className={styles.navSearchMobile}
						onClick={() => dispatch(setBurgerModalState(false))}
					>
						Search for recipes
					</Link>
					<Link
						to="/myRecipes"
						className={styles.navSearchMobile}
						onClick={() => dispatch(setBurgerModalState(false))}
					>
						My recipes
					</Link>
					<Link
						to="/search"
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
				isOpen={isBurgerModalOpen}
				closeTimeoutMS={500}
				onRequestClose={() => dispatch(setBurgerModalState(false))}
				className={styles.modalContent}
			>
				<nav className={styles.showNavMobile}>
					<div
						className={styles.navLoginMobile}
						onClick={() => {
							dispatch(toggleRegisterModal());
							dispatch(setBurgerModalState(false));
						}}
					>
						Register
					</div>
					<div
						className={styles.navLoginMobile}
						onClick={() => {
							dispatch(toggleLoginModal());
							dispatch(setBurgerModalState(false));
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

export default BurgerModal;
