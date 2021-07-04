import './App.css';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { closeModal } from './store/actions/recipesActions';

import Search from './Components/Recipes/Recipes';

Modal.setAppElement('#root');
function App(props) {
  const steps = props.steps[0];
  const renderSteps = steps && steps.map(step => {
    console.log(step)
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
				isOpen={props.isModalOpen}
				closeTimeoutMS={500}
				onRequestClose={() => props.closeModal()}
        className="modal-content"
			>
				<h1>Instructions</h1>
				{renderSteps}
				<button className="recipe__close" onClick={() => props.closeModal()}>Close</button>
			</Modal>
			<Search />
		</div>
	);
}

const mapStateToProps = state => {
  return {
    steps: state.steps,
    isModalOpen: state.isModalOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal(false))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
