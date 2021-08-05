import Modal from 'react-modal';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { closeModal, storeRecipe } from './store/actions/recipeActions';
import {
	toggleRegisterModal,
	toggleLoginModal,
	startLoginGoogle,
	getUserIdAndEmail,
} from './store/actions/authActions';
import Search from './Components/FindRecipes/FindRecipes';
import './firebase/firebase';
import Navigation from './Components/Navigation/Navigation';
import { firebase } from './firebase/firebase';
import MyRecipes from './Components/MyRecipes/MyRecipes';
import styles from './App.module.css';

Modal.setAppElement('#root');
function App({
	isModalOpen,
	selectedRecipe,
	closeModal,
	storeRecipe,
	userId,
	toggleRegisterModal,
	toggleLoginModal,
	startLoginGoogle,
	getUserIdAndEmail,
}) {
	const renderSteps =
		selectedRecipe.analyzedInstructions &&
		selectedRecipe.analyzedInstructions[0].steps.map((step) => {
			return (
				<div key={step.number} className={styles['modal-steps']}>
					<span>{step.number}. </span>
					{step.step}
				</div>
			);
		});

	const renderButtons = (
		<>
			<button className={styles['recipe__close']} onClick={() => closeModal()}>
				Close
			</button>
			{userId ? (
				<button
					className={styles['recipe__save']}
					onClick={() => storeRecipe()}
				>
					Save Recipe
				</button>
			) : (
				<>
					<button
						className={styles['recipe__save']}
						onClick={toggleRegisterModal}
					>
						Register
					</button>
					<button className={styles['recipe__save']} onClick={toggleLoginModal}>
						Login
					</button>
					<button className={styles['recipe__save']} onClick={startLoginGoogle}>
						Google Login
					</button>
				</>
			)}
		</>
	);

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			getUserIdAndEmail(user.uid, user.email);
		} else {
			console.log('Not logged in');
		}
	});

	return (
		<div className='App'>
			<Modal
				isOpen={isModalOpen}
				closeTimeoutMS={500}
				onRequestClose={() => closeModal()}
				className={styles['modal-content']}
			>
				<div className={styles['modal-header']}>
					<h1>
						Instructions for {selectedRecipe.servings}{' '}
						{selectedRecipe.servings === 1 ? 'serving' : 'servings'}
					</h1>
					<i>Ready in {selectedRecipe.readyInMinutes} minutes</i>
				</div>
				{renderSteps}
				{renderButtons}
			</Modal>
			<BrowserRouter>
				<Navigation />
				<Switch>
					<Route path='/' exact component={Search} />
					<Route path='/myRecipes' component={MyRecipes} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		isModalOpen: state.recipes.isModalOpen,
		selectedRecipe: state.recipes.selectedRecipe,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		closeModal: () => dispatch(closeModal(false)),
		storeRecipe: () => dispatch(storeRecipe()),
		toggleLoginModal: () => dispatch(toggleLoginModal()),
		toggleRegisterModal: () => dispatch(toggleRegisterModal()),
		startLoginGoogle: () => dispatch(startLoginGoogle()),
		getUserIdAndEmail: (uid, email) => dispatch(getUserIdAndEmail(uid, email)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
