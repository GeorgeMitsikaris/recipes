import './App.css';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { closeModal, storeRecipe } from './store/actions/recipeActions';

import Search from './Components/Recipes/Recipes';
import './firebase/firebase'; 
import Navigation from './Components/NavigationBar/Navigation';
import { firebase } from './firebase/firebase';

Modal.setAppElement('#root');
function App({isModalOpen, selectedRecipe, closeModal, storeRecipe}) {
  const renderSteps = selectedRecipe.analyzedInstructions && selectedRecipe.analyzedInstructions[0].steps.map((step) => {
		  return (
		    <div key={step.number} className="modal-steps">
		      <span>{step.number}. </span>
		      {step.step}
		    </div>
		  )
	})
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
				<button className='recipe__close' onClick={() => closeModal()}>
					Close
				</button>
        <button className='recipe__save' onClick={() => storeRecipe()}>
          Save Recipe
        </button>
			</Modal>
      <Navigation />
			<Search />
		</div>
	);
}

const mapStateToProps = state => {
  return {
    isModalOpen: state.recipes.isModalOpen,
    selectedRecipe: state.recipes.selectedRecipe
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal(false)),
    storeRecipe: () => dispatch(storeRecipe())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
