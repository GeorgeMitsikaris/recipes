import React, { useContext } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";

import { setDeleteRecipeModalState } from "../../../store/actions/modalActions";
import { DeleteRecipeContext } from '../../../storeContext/DeleteRecipeContext';
import styles from "./DeleteRecipeModal.module.css";

const DeleteRecipeModal = () => {
	// The reason we are using the React Context api here is because DeleteRecipeModal is the grandchild of MyRecipes component.
	// In the MyRecipes component we are fetching the recipes we have stored in firebase. So the delete method must be declared there,
	// in order to use the method which fetches the recipes after the deletion. The easiest way to avoid props drilling is the Context api.
	const deleteRecipe = useContext(DeleteRecipeContext)
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
