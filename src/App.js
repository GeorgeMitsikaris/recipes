import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { firebase } from './firebase/firebase';
import { ToastContainer } from 'react-toastify';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
import MyRecipes from './Components/MyRecipes/MyRecipes';
import styles from './App.module.css';
import RecipeFormModal from './Components/AuthModals/RecipeFormModal/RecipeFormModal';

Modal.setAppElement('#root');
function App() {
	const dispatch = useDispatch();
	const isModalOpen = useSelector((state) => state.recipes.isModalOpen);
	const selectedRecipe = useSelector((state) => state.recipes.selectedRecipe);
	const userId = useSelector((state) => state.auth.userId);

	const renderSteps =
		selectedRecipe.analyzedInstructions &&
		selectedRecipe.analyzedInstructions.map((step, index) => {
			return (
				<div key={uuid()} className={styles['modal-steps']}>
					<span>{index + 1}. </span>
					{step}
				</div>
			);
		});

	const renderButtons = (
		<>
			<button
				className={styles['recipe__close']}
				onClick={() => dispatch(closeModal())}
			>
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
					<button
						className={styles['recipe__save']}
						onClick={dispatch(toggleLoginModal)}
					>
						Login
					</button>
					<button
						className={styles['recipe__save']}
						onClick={dispatch(startLoginGoogle)}
					>
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
				<Route
					render={({ location }) => (
						<TransitionGroup>
							<CSSTransition key={location.key} timeout={500} classNames={{
                enter: styles.fadeEnter,
                exit: styles.fadeExit,
                appear: styles.fadeAppear,
                enterActive: styles.fadeEnterActive,
                exitActive: styles.fadeExitActive,
                appearActive: styles.fadeAppearActive
              }} mountOnEnter unmountOnExit>
								<Switch location={location}>
                  <Route path='/' exact component={Search} />
                  <Route path='/myRecipes' component={MyRecipes} />
                  <Route path='/recipeForm' component={RecipeFormModal} />
								</Switch>
							</CSSTransition>
						</TransitionGroup>
					)}
				/>
			</BrowserRouter>
			<ToastContainer />
		</div>
	);
}

export default App;
