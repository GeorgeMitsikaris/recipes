import './App.css';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { closeModal } from './store/actions/recipesActions';

import Search from './Components/Recipes/Recipes';

Modal.setAppElement('#root');
function App({isModalOpen, selectedRecipe, closeModal}) {
  // const steps = props.steps;
  // const renderSteps = steps && steps.map(step => {
  //   console.log(step)
  //   return (
  //     <div key={step.number} className="modal-steps">
  //       <span>{step.number}. </span>
  //       {step.step}
  //     </div>
  //   )
  // })
  const renderSteps = selectedRecipe.analyzedInstructions && selectedRecipe.analyzedInstructions[0].steps.map((step) => {
		console.log(step);
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
        className="modal-content"
			>
				<h1>Instructions</h1>
				{renderSteps}
				<button className="recipe__close" onClick={() => closeModal()}>Close</button>
			</Modal>
			<Search />
		</div>
	);
}

const mapStateToProps = state => {
  return {
    // steps: state.steps,
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
