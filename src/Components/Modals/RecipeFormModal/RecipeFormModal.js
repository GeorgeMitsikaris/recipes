import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLocation, useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import database from "../../../firebase/firebase";
import { setRecipesFormModalState } from "../../../store/actions/modalActions";

import styles from "./RecipeFormModal.module.css";

function RecipeFormModal() {
	const userId = useSelector((state) => state.auth.userId);
	const isRecipesFormModalOpen = useSelector(
		(state) => state.modal.isRecipesFormModalOpen
	);
	const { state } = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();

	let schema = yup.object().shape({
		title: yup.string().required("Recipe title is required"),
		extendedIngredients: yup
			.array()
			.of(
				yup.object().shape({
					name: yup.string().required("Name is required"),
					amount: yup
						.number()
						.transform((value) => (isNaN(value) ? undefined : value))
						.required("Amount is required"),
				})
			)
			.min(1, "A recipe must have at least one ingredient"),
		analyzedInstructions: yup
			.array()
			.of(
				yup.object().shape({ step: yup.string().required("Step is required") })
			)
			.min(1, "Please add instructions"),
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
				servings: state?.recipe?.servings,
			};
		} else {
			return {
				title: "",
				readyInMinutes: "",
				analyzedInstructions: [],
				extendedIngredients: [],
				servings: "",
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
		mode: "onBlur",
		defaultValues: defaultValues(),
	});

	const {
		fields: ingredientFields,
		append: ingredientAppend,
		remove: ingredientRemove,
	} = useFieldArray({
		control,
		name: "extendedIngredients",
	});

	const {
		fields: instructionFields,
		append: instructionAppend,
		remove: instructionRemove,
	} = useFieldArray({
		control,
		name: "analyzedInstructions",
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
					toast.success("Successfully updated recipe");
				} else {
					toast.success("Successfully created recipe");
				}
			})
			.catch((error) => {
				toast.error(error.message);
			});
		reset();
		dispatch(setRecipesFormModalState(false));
		history.push("/search");
	};

	const addIngredient = () => {
		ingredientAppend({});
		clearErrors("extendedIngredients");
	};

	const addInstructions = () => {
		instructionAppend({});
		clearErrors("analyzedInstructions");
	};

	const renderIngredients =
		window.innerWidth > 900 ? (
			<div className={styles.tableWrap}>
				<label>Ingredients</label>
				<table className={`${styles.tableForm} ${styles.ingredientTable}`}>
					<thead>
						<tr>
							<th>Name*</th>
							<th>Amount*</th>
							<th>Unit</th>
							<th>
								<button type="button" onClick={addIngredient}>
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
												type="text"
											/>
											<div className={styles.textErrorWrap}>
												<span className={styles.textError}>
													{errors?.extendedIngredients?.[index]?.name?.message}
												</span>
											</div>
										</td>
										<td>
											<input
												{...register(`extendedIngredients[${index}].amount`)}
												name={`extendedIngredients[${index}].amount`}
												type="text"
											/>
											<div className={styles.textErrorWrap}>
												<span className={styles.textError}>
													{
														errors?.extendedIngredients?.[index]?.amount
															?.message
													}
												</span>
											</div>
										</td>
										<td>
											<input
												{...register(`extendedIngredients[${index}].unit`)}
												name={`extendedIngredients[${index}].unit`}
												type="text"
											/>
										</td>
										<td>
											<button
												type="button"
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
				<span className={styles.textError}>
					{errors?.extendedIngredients?.message}
				</span>
			</div>
		) : (
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
										<label>Name*</label>
										<input
											{...register(`extendedIngredients[${index}].name`)}
											name={`extendedIngredients[${index}].name`}
											type="text"
										/>
										<span className={styles.textErrorMobile}>
											{errors?.extendedIngredients?.[index]?.name?.message}
										</span>
									</div>
									<div className={styles.mobileInputWrap}>
										<label>Amount*</label>
										<input
											{...register(`extendedIngredients[${index}].amount`)}
											name={`extendedIngredients[${index}].amount`}
											type="text"
										/>
										<span className={styles.textErrorMobile}>
											{errors?.extendedIngredients?.[index]?.amount?.message}
										</span>
									</div>
									<div className={styles.mobileInputWrap}>
										<label>Unit</label>
										<input
											{...register(`extendedIngredients[${index}].unit`)}
											name={`extendedIngredients[${index}].unit`}
											type="text"
										/>
									</div>
									<div className={styles.removeButtonWrap}>
										<button
											type="button"
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
					type="button"
					onClick={addIngredient}
					className={styles.addButton}
				>
					Add ingredient
				</button>
				<span className={styles.textError}>
					{errors?.extendedIngredients?.message}
				</span>
			</div>
		);

	const renderInstructions =
		window.innerWidth > 900 ? (
			<div className={styles.tableWrap}>
				<label>Instructions</label>
				<table className={styles.tableForm}>
					<thead>
						<tr>
							<th className={styles.firstCell}>Step*</th>
							<th>
								<button type="button" onClick={addInstructions}>
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
												type="text"
												rows="3"
											></textarea>
											<div className={styles.textErrorWrap}>
												<span className={styles.textError}>
													{errors?.analyzedInstructions?.[index]?.step?.message}
												</span>
											</div>
										</td>
										<td>
											<button
												type="button"
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
				<span className={styles.textError}>
					{errors?.analyzedInstructions?.message}
				</span>
			</div>
		) : (
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
									<label>Step*</label>
									<textarea
										{...register(`analyzedInstructions[${index}].step`)}
										name={`analyzedInstructions[${index}].step`}
										type="text"
										rows="3"
									></textarea>
									<span className={styles.textErrorMobile}>
										{errors?.analyzedInstructions?.[index]?.step?.message}
									</span>
								</div>
								<div className={styles.removeButtonWrap}>
									<button
										type="button"
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
					type="button"
					onClick={addInstructions}
					className={styles.addButton}
				>
					Add step
				</button>
				<span className={styles.textError}>
					{errors?.analyzedInstructions?.message}
				</span>
			</div>
		);

	const renderModal = (
		<div className={styles.modal}>
			<form className={styles.modalForm} onSubmit={handleSubmit(submitHandler)}>
				<h2>{state.isEditMode ? "Edit recipe" : "Create recipe"}</h2>
				<input type="hidden" name="id" {...register("id")} value={uuid()} />
				<div className={styles.modalInputWrapTitle}>
					<label>Title*</label>
					<input
						placeholder="Recipe's title"
						type="text"
						name="title"
						{...register("title")}
					/>
					<span className={styles.textError}>{errors.title?.message}</span>
				</div>
				<hr />
				{renderIngredients}
				<hr />
				{renderInstructions}
				<hr />
				<div className={styles.timeServingsWrap}>
					<div className={styles.modalInputWrap}>
						<label>Ready in </label>
						<input
							placeholder="The required time"
							type="text"
							name="readyInMinutes"
							{...register("readyInMinutes")}
						/>
					</div>
					<div className={styles.modalInputWrap}>
						<label>Servings</label>
						<input
							placeholder="Servings"
							type="text"
							name="servings"
							{...register("servings")}
						/>
					</div>
				</div>
				<div className={styles.formSubmitWrap}>
					<button className={styles.formCancel} type="button">
						<Link
							to={state?.previousPath}
							onClick={() => dispatch(setRecipesFormModalState(false))}
						>
							Cancel
						</Link>
					</button>
					<button className={styles.formSubmit} type="submit">
						{state?.isEditMode ? "Update" : "Create"}
					</button>
				</div>
			</form>
		</div>
	);
	return (
		<div className={styles.transition}>
			<Modal
				isOpen={isRecipesFormModalOpen}
				closeTimeoutMS={500}
				onRequestClose={() => {
					dispatch(setRecipesFormModalState(false));
					history.push("/search");
				}}
				className={styles.modal}
				overlayClassName={styles.modalOverlay}
			>
				{renderModal}
			</Modal>
		</div>
	);
}

export default RecipeFormModal;
