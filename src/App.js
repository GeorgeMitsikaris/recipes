import './App.css';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { closeModal, storeRecipe } from './store/actions/recipeActions';
import {
	toggleRegisterModal,
	toggleLoginModal,
	startLoginGoogle,
} from './store/actions/authActions';

import Search from './Components/Recipes/Recipes';
import './firebase/firebase';
import Navigation from './Components/NavigationBar/Navigation';
import { firebase } from './firebase/firebase';

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
}) {
	const renderSteps =
		selectedRecipe.analyzedInstructions &&
		selectedRecipe.analyzedInstructions[0].steps.map((step) => {
			return (
				<div key={step.number} className='modal-steps'>
					<span>{step.number}. </span>
					{step.step}
				</div>
			);
		});

	const renderButtons = (
		<>
			<button className='recipe__close' onClick={() => closeModal()}>
				Close
			</button>
			{userId ? (
				<button className='recipe__save' onClick={() => storeRecipe()}>
					Save Recipe
				</button>
			) : (
				<>
					<button className='recipe__save' onClick={toggleRegisterModal}>
						Register
					</button>
					<button className='recipe__save' onClick={toggleLoginModal}>
						Login
					</button>
					<button className='recipe__save' onClick={startLoginGoogle}>
						Google Login 
					</button>
				</>
			)}
		</>
	);

	firebase.auth().onAuthStateChanged((user) => {
		if (user) console.log('Logged In');
		else console.log('Not logged in');
	});

	return (
		<div className='App'>
			<Modal
				isOpen={isModalOpen}
				closeTimeoutMS={500}
				onRequestClose={() => closeModal()}
				className='modal-content'
			>
				<div className='modal-header'>
					<h1>
						Instructions for {selectedRecipe.servings}{' '}
						{selectedRecipe.servings === 1 ? 'serving' : 'servings'}
					</h1>
					<i>Ready in {selectedRecipe.readyInMinutes} minutes</i>
				</div>
				{renderSteps}
				{renderButtons}
			</Modal>
			<Navigation />
			<Search />
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
