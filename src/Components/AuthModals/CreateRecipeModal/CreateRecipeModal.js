import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useSelector } from 'react-redux';

import styles from './CreateRecipeModal.module.css';

function CreateRecipeModal() {
  // const userId = useSelector(state => state.auth.userId);
  const [isModalOpen, setIsModalOpen] = useState(true);

	let schema = yup.object().shape({
		title: yup
			.string()
			.required('Recipe title is required'),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onBlur',
	});

  const renderModal = (
		<div className={styles.modal}>
			<h2>Create your recipe</h2>
			<form>
				<div className={styles.modalInputWrap}>
					<label>Recipe's title</label>
					<input type='text' name='title' {...register('title')} />
					<span>{errors.title?.message}</span>
				</div>
			</form>
		</div>
	);
  return(
    <Modal
      isOpen={isModalOpen}
      closeTimeoutMS={500}
      onRequestClose={()=>setIsModalOpen(false)}
      className=''
    >
    {renderModal}
    </Modal>
  )
}

export default CreateRecipeModal;
