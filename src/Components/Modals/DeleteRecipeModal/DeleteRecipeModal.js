import React from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";

import { setDeleteRecipeModalState } from "../../../store/actions/modalActions";
import styles from "./DeleteRecipeModal.module.css";

const DeleteRecipeModal = ({ deleteRecipe }) => {
	const isDeleteModalOpen = useSelector(
		(state) => state.modal.isDeleteRecipeModalOpen
	);
	const recipeToDelete = useSelector((state) => state.recipes.recipeToDelete);
	const dispatch = useDispatch();
	const deleteRecipeHandler = () => {
		deleteRecipe(recipeToDelete.id);
		dispatch(setDeleteRecipeModalState(false));
	};
	return (
		<Modal
			isOpen={isDeleteModalOpen}
			closeTimeoutMS={500}
			onRequestClose={() => dispatch(setDeleteRecipeModalState(false))}
			className={styles.modalContent}
			overlayClassName={styles.overlay}
		>
			<div className={styles.deleteRecipe}>
				<div className={styles.message}>
					Are you sure you want to delete the{" "}
					<span>{recipeToDelete.title}</span> recipe?
				</div>
				<div className={styles.actions}>
					<button className={styles.deleteButton} onClick={() => deleteRecipeHandler()}>
						Yes
					</button>
					<button className={styles.cancelButton} onClick={() => dispatch(setDeleteRecipeModalState(false))}>
						Cancel
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default DeleteRecipeModal;
