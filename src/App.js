import './App.css';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { closeModal } from './store/actions/recipesActions';

import Search from './Components/Recipes/Recipes';
import './firebase/firebase';

Modal.setAppElement('#root');
function App({isModalOpen, selectedRecipe, closeModal}) {
  const renderSteps = selectedRecipe.analyzedInstructions && selectedRecipe.analyzedInstructions[0].steps.map((step) => {
		  return (
		    <div key={step.number} className="modal-steps">
		      <span>{step.number}. </span>
		      {step.step}
		    </div>
		  )
	})

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
			</Modal>
			<Search />
		</div>
	);
}

const mapStateToProps = state => {
  return {
    isModalOpen: state.isModalOpen,
    selectedRecipe: state.selectedRecipe
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal(false))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
