import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import database from '../../../firebase/firebase';

import styles from './CreateRecipeModal.module.css';

function CreateRecipeModal() {
	const userId = useSelector((state) => state.auth.userId);
	const [isModalOpen, setIsModalOpen] = useState(true);

	let schema = yup.object().shape({
		title: yup.string().required('Recipe title is required'),
	});

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onBlur',
	});

	const {
		fields: ingredientFields,
		append: ingredientAppend,
		remove: ingredientRemove,
	} = useFieldArray({
		control,
		name: 'extendedIngredients',
	});

	const {
		fields: instructionFields,
		append: instructionAppend,
		remove: instructionRemove,
	} = useFieldArray({
		control,
		name: 'analyzedInstructions',
	});

	const submitHandler = (data) => {
		const instructions = data.analyzedInstructions.map((step) => step.step);
		const recipe = { ...data, analyzedInstructions: instructions };
		database
			.ref(userId)
			.child(recipe.title)
			.set(recipe)
			.then(() => {
				console.log('recipe saved');
			});
	};

	const renderModal = (
		<div className={styles.modal}>
			<h2>Create your recipe</h2>
			<form className={styles.modalForm} onSubmit={handleSubmit(submitHandler)}>
				<input type='hidden' name='id' {...register('id')} value={uuid()} />
				<div className={styles.modalInputWrap}>
					<label>Title</label>
					<input
						placeholder="Recipe's title"
						type='text'
						name='title'
						{...register('title')}
					/>
					<span>{errors.title?.message}</span>
				</div>
				<table className={styles.ingredientsTable}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Amount</th>
							<th>Unit</th>
							<th>
								<button type='button' onClick={() => ingredientAppend({})}>
									Add ingredient
								</button>
							</th>
						</tr>
					</thead>
					<tbody>
						{ingredientFields.map(({ id }, index) => {
							return (
								<tr key={id}>
									<td>
										<input
											{...register(`extendedIngredients[${index}].name`)}
											name={`extendedIngredients[${index}].name`}
											type='text'
										/>
									</td>
									<td>
										<input
											{...register(`extendedIngredients[${index}].amount`)}
											name={`extendedIngredients[${index}].amount`}
											type='number'
										/>
									</td>
									<td>
										<input
											{...register(`extendedIngredients[${index}].unit`)}
											name={`extendedIngredients[${index}].unit`}
											type='text'
										/>
									</td>
									<td>
										<button
											type='button'
											onClick={() => ingredientRemove(index)}
										>
											Remove row
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				{instructionFields.map(({ id }, index) => {
					return (
						<div key={id}>
							<input
								{...register(`analyzedInstructions[${index}].step`)}
								name={`analyzedInstructions[${index}].step`}
								type='text'
							/>
							<button type='button' onClick={() => instructionRemove(index)}>
								Remove step
							</button>
						</div>
					);
				})}
				<button type='button' onClick={() => instructionAppend({})}>
					Append step
				</button>
				<div className={styles.modalInputWrap}>
					<label>Ready in </label>
					<input
						placeholder='The required time'
						type='text'
						name='readyInMinutes'
						{...register('readyInMinutes')}
					/>
					<span>{errors.title?.message}</span>
				</div>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
	return (
		<Modal
			isOpen={isModalOpen}
			closeTimeoutMS={500}
			onRequestClose={() => setIsModalOpen(false)}
			className=''
		>
			{renderModal}
		</Modal>
	);
}

export default CreateRecipeModal;
