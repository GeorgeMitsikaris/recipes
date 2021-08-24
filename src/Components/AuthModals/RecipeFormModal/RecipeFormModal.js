import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import database from '../../../firebase/firebase';

import styles from './RecipeFormModal.module.css';

function RecipeFormModal() {
	const userId = useSelector((state) => state.auth.userId);
	const [isModalOpen, setIsModalOpen] = useState(true);
	const { state } = useLocation();
	const history = useHistory();

	let schema = yup.object().shape({
		title: yup.string().required('Recipe title is required'),
		extendedIngredients: yup
			.array()
			.of(
				yup.object().shape({
					name: yup.string().required('Ingredient must have a name'),
					amount: yup.number().required('Amount is required'),
				})
			)
			.min(1, 'A recipe must have at least one ingredient'),
		analyzedInstructions: yup.array().min(1, 'Please add instructions'),
	});

	const defaultValues = () => {
		if (state?.isEditMode) {
			return {
				title: state?.recipe?.title,
				readyInMinutes: state?.recipe?.readyInMinutes,
				analyzedInstructions: state?.recipe?.steps.map((step, index) => {
					return {
						step,
					};
				}),
				extendedIngredients: state?.recipe?.ingredients,
				id: state?.recipe?.id,
			};
		} else {
			return {
				title: '',
				readyInMinutes: '',
				analyzedInstructions: [],
				extendedIngredients: [],
			};
		}
	};

	const {
		register,
		control,
		handleSubmit,
		reset,
		clearErrors,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onBlur',
		defaultValues: defaultValues(),
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
			.child(recipe.id)
			.update(recipe)
			.then(() => {
				if (state.isEditMode) {
					toast.success('Successfully updated recipe');
				} else {
					toast.success('Recipe successfully created');
				}
			})
			.catch((error) => {
				toast.error(error.message);
			});
		reset();
		setIsModalOpen(false);
		history.push('/');
	};

	const addIngredient = () => {
		ingredientAppend({});
		clearErrors('extendedIngredients');
	};

	const addInstructions = () => {
		instructionAppend({});
		clearErrors('analyzedInstructions');
	};
	const renderModal = (
		<div className={styles.modal}>
			<h2>{state.isEditMode ? 'Edit recipe' : 'Create recipe'}</h2>
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
					<span className={styles.textError}>{errors.title?.message}</span>
				</div>
				<hr />
				<div className={styles.tableWrap}>
					<label>Ingredients</label>
					<table className={`${styles.tableForm} ${styles.ingredientTable}`}>
						<thead>
							<tr>
								<th>Name</th>
								<th>Amount</th>
								<th>Unit</th>
								<th>
									<button type='button' onClick={addIngredient}>
										Add ingredient
									</button>
								</th>
							</tr>
						</thead>
						<tbody>
							<TransitionGroup component={null}>
								{ingredientFields.map(({ id }, index) => (
									<CSSTransition
										key={id}
										timeout={500}
										classNames={{
											enter: styles.fadeEnter,
											exit: styles.fadeExit,
											appear: styles.fadeAppear,
											enterActive: styles.fadeEnterActive,
											exitActive: styles.fadeExitActive,
											appearActive: styles.fadeAppearActive,
										}}
										mountOnEnter
										unmountOnExit
									>
										<tr>
											<td>
												<input
													{...register(`extendedIngredients[${index}].name`)}
													name={`extendedIngredients[${index}].name`}
													type='text'
												/>
												<span className={styles.textError}>
													{errors?.extendedIngredients?.[index]?.name?.message}
												</span>
											</td>
											<td>
												<input
													{...register(`extendedIngredients[${index}].amount`)}
													name={`extendedIngredients[${index}].amount`}
													type='text'
												/>
												<span className={styles.textError}>
													{errors?.ingredientFields?.[index]?.amount?.message}
												</span>
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
													Remove ingredient
												</button>
											</td>
										</tr>
									</CSSTransition>
								))}
							</TransitionGroup>
						</tbody>
					</table>
				</div>
				<div className={styles.mobileIngredients}>
					<label className={styles.labelIngredients}>Ingredients</label>
					<TransitionGroup>
						{ingredientFields.map(({ id }, index) => (
							<CSSTransition
								key={id}
								timeout={500}
								classNames={{
									enter: styles.fadeEnter,
									exit: styles.fadeExit,
									appear: styles.fadeAppear,
									enterActive: styles.fadeEnterActive,
									exitActive: styles.fadeExitActive,
									appearActive: styles.fadeAppearActive,
								}}
								mountOnEnter
								unmountOnExit
							>
								<div key={id}>
									<div className={styles.inputContainer}>
										<div className={styles.mobileInputWrap}>
											<label>Name</label>
											<input
												{...register(`extendedIngredients[${index}].name`)}
												name={`extendedIngredients[${index}].name`}
												type='text'
											/>
										</div>
										<div className={styles.mobileInputWrap}>
											<label>Amount</label>
											<input
												{...register(`extendedIngredients[${index}].amount`)}
												name={`extendedIngredients[${index}].amount`}
												type='text'
											/>
										</div>
										<div className={styles.mobileInputWrap}>
											<label>Unit</label>
											<input
												{...register(`extendedIngredients[${index}].unit`)}
												name={`extendedIngredients[${index}].unit`}
												type='text'
											/>
										</div>
										<div className={styles.removeButtonWrap}>
											<button
												type='button'
												className={styles.removeButton}
												onClick={() => ingredientRemove(index)}
											>
												Remove
											</button>
										</div>
									</div>
								</div>
							</CSSTransition>
						))}
					</TransitionGroup>
					<button
						type='button'
						onClick={addIngredient}
						className={styles.addButton}
					>
						Add ingredient
					</button>
				</div>
				<span className={styles.textError}>
					{errors?.extendedIngredients?.message}
				</span>
				<hr />
				<div className={styles.tableWrap}>
					<label>Instructions</label>
					<table className={styles.tableForm}>
						<thead>
							<tr>
								<th className={styles.firstCell}>Step</th>
								<th>
									<button type='button' onClick={addInstructions}>
										Add step
									</button>
								</th>
							</tr>
						</thead>
						<tbody>
							<TransitionGroup component={null}>
								{instructionFields.map(({ id }, index) => (
									<CSSTransition
										key={id}
										timeout={500}
										classNames={{
											enter: styles.fadeEnter,
											exit: styles.fadeExit,
											appear: styles.fadeAppear,
											enterActive: styles.fadeEnterActive,
											exitActive: styles.fadeExitActive,
											appearActive: styles.fadeAppearActive,
										}}
										mountOnEnter
										unmountOnExit
									>
										<tr key={id}>
											<td className={styles.firstCell}>
												<textarea
													{...register(`analyzedInstructions[${index}].step`)}
													name={`analyzedInstructions[${index}].step`}
													type='text'
												></textarea>
											</td>
											<td>
												<button
													type='button'
													onClick={() => instructionRemove(index)}
												>
													Remove step
												</button>
											</td>
										</tr>
									</CSSTransition>
								))}
							</TransitionGroup>
						</tbody>
					</table>
				</div>
				<div className={styles.mobileIngredients}>
					<label className={styles.labelIngredients}>Instructions</label>
					<TransitionGroup>
						{instructionFields.map(({ id }, index) => (
							<CSSTransition
								key={id}
								timeout={500}
								classNames={{
									enter: styles.fadeEnter,
									exit: styles.fadeExit,
									appear: styles.fadeAppear,
									enterActive: styles.fadeEnterActive,
									exitActive: styles.fadeExitActive,
									appearActive: styles.fadeAppearActive,
								}}
								mountOnEnter
								unmountOnExit
							>
								<div className={styles.inputContainer}>
									<div className={styles.mobileInputWrap}>
										<label>Step</label>
										<textarea
											{...register(`analyzedInstructions[${index}].step`)}
											name={`analyzedInstructions[${index}].step`}
											type='text'
										></textarea>
									</div>
									<div className={styles.removeButtonWrap}>
										<button
											type='button'
											className={styles.removeButton}
											onClick={() => instructionRemove(index)}
										>
											Remove
										</button>
									</div>
								</div>
							</CSSTransition>
						))}
					</TransitionGroup>
					<button
						type='button'
						onClick={addInstructions}
						className={styles.addButton}
					>
						Add step
					</button>
				</div>
				<span className={styles.textError}>
					{errors?.analyzedInstructions?.message}
				</span>
				<hr />
				<div className={styles.modalInputWrap}>
					<label>Ready in </label>
					<input
						placeholder='The required time'
						type='text'
						name='readyInMinutes'
						{...register('readyInMinutes')}
					/>
				</div>
				<div className={styles.formSubmitWrap}>
					<button className={styles.formSubmit} type='submit'>
						Submit
					</button>
					<button className={styles.formCancel} type='submit'>
						<NavLink
							to={state?.previousPath}
							onClick={() => setIsModalOpen(false)}
						>
							Cancel
						</NavLink>
					</button>
				</div>
			</form>
		</div>
	);
	return (
		<div className={styles.transition}>
			<Modal
				isOpen={isModalOpen}
				closeTimeoutMS={500}
				onRequestClose={() => {
					setIsModalOpen(false);
					history.push('/');
				}}
				className=''
			>
				{renderModal}
			</Modal>
		</div>
	);
}

export default RecipeFormModal;
