import React from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

import { setDeleteRecipeModalState } from '../../../store/actions/modalActions';
import styles from './DeleteRecipeModal.module.css';

const DeleteRecipeModal = ({deleteRecipe}) => {
  const isDeleteModalOpen = useSelector(state => state.modal.isDeleteRecipeModalOpen);
  const recipeToDelete = useSelector(state => state.recipes.recipeToDelete);
  const dispatch = useDispatch();
  const deleteRecipeHandler = () => {
    deleteRecipe(recipeToDelete.id);
    dispatch(setDeleteRecipeModalState(false));
  }
  return (
    <Modal
      isOpen={isDeleteModalOpen}
			closeTimeoutMS={500}
			onRequestClose={() => dispatch(setDeleteRecipeModalState(false))}
			className={styles.modalContainer}
			overlayClassName={styles.overlay}
    >
      <>
        <h3>Are you sure you want to delete the recipe with title {recipeToDelete.title}</h3> 
        <button onClick={() => deleteRecipeHandler()}>Delete</button>
        <button onClick={() => dispatch(setDeleteRecipeModalState(false))}>Cancel</button>
      </>
    </Modal>
  )
}

export default DeleteRecipeModal
