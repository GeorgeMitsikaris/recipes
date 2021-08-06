import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
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
function App() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.recipes.isModalOpen)
  const selectedRecipe = useSelector(state => state.recipes.selectedRecipe)
	const	userId = useSelector(state =>  state.auth.userId)

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
			<button className={styles['recipe__close']} onClick={() => dispatch(closeModal())}>
				Close
			</button>
			{userId ? (
				<button
					className={styles['recipe__save']}
					onClick={() => dispatch(storeRecipe())}
				>
					Save Recipe
				</button>
			) : (
				<>
					<button
						className={styles['recipe__save']}
						onClick={dispatch(toggleRegisterModal)}
					>
						Register
					</button>
					<button className={styles['recipe__save']} onClick={dispatch(toggleLoginModal)}>
						Login
					</button>
					<button className={styles['recipe__save']} onClick={dispatch(startLoginGoogle)}>
						Google Login
					</button>
				</>
			)}
		</>
	);

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			dispatch(getUserIdAndEmail(user.uid, user.email));
		} else {
			console.log('Not logged in');
		}
	});

	return (
		<div className='App'>
			<Modal
				isOpen={isModalOpen}
				closeTimeoutMS={500}
				onRequestClose={() => dispatch(closeModal())} 
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

export default App;
