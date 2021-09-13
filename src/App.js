import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { firebase } from "./firebase/firebase";
import { ToastContainer } from "react-toastify";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { closeModal, storeRecipe } from "./store/actions/recipeActions";
import {
	toggleRegisterModal,
	toggleLoginModal,
	startLoginGoogle,
	getUserIdAndEmail,
} from "./store/actions/authActions";
import Search from "./Components/FindRecipes/FindRecipes";
import "./firebase/firebase";
import Navigation from "./Components/Navigation/Navigation";
import MyRecipes from "./Components/MyRecipes/MyRecipes";
import styles from "./App.module.css";
import RecipeFormModal from "./Components/Modals/RecipeFormModal/RecipeFormModal";
import InitialPage from "./Components/InitialPage/InitialPage";
import AboutMe from "./Components/AboutMe/AboutMe";

Modal.setAppElement("#root");
function App() {
	const dispatch = useDispatch();
	const isModalOpen = useSelector((state) => state.recipes.isModalOpen);
	const selectedRecipe = useSelector((state) => state.recipes.selectedRecipe);
	const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
	const userId = useSelector((state) => state.auth.userId);

	// When we select a recipe by pressing the button 'Get Instructions' we store it in the global state (redux)
	// and then we render the instructions
	const renderSteps =
		selectedRecipe.analyzedInstructions &&
		selectedRecipe.analyzedInstructions.map((step, index) => {
			return (
				<div key={uuid()} className={styles.modalSteps}>
					<span>{index + 1}. </span>
					{step}
				</div>
			);
		});

	// We render different buttons based on if the user is logged in or not (the close button is common)
	const renderButtons = (
		<>
			<button
				className={styles.recipeClose}
				onClick={() => dispatch(closeModal())}
			>
				Close
			</button>
			{userId ? (
				<button
					className={styles.recipeSave}
					onClick={() => dispatch(storeRecipe())}
				>
					Save Recipe
				</button>
			) : (
				<>
					<button
						className={styles.recipeSave}
						onClick={() => dispatch(toggleRegisterModal())}
					>
						Register
					</button>
					<button
						className={styles.recipeSave}
						onClick={() => dispatch(toggleLoginModal())}
					>
						Login
					</button>
					<button
						className={styles.recipeSave}
						onClick={() => dispatch(startLoginGoogle())}
					>
						Google Login
					</button>
				</>
			)}
		</>
	);

	// Firebase is configured to remember if the user is logged in. The following code checks that.
	// We use the isUserLoggedIn flag to check only once if the user is logged in, because the onAuthStateChanged method 
	// is running every time we call firebase.
	if (!isUserLoggedIn) {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				dispatch(getUserIdAndEmail(user.uid, user.email));
			} else {
				// console.log("Not logged in");
			}
		});
	}

	return (
		// For more info about React Modal check the documentation -> https://reactcommunity.org/react-modal/
		<div className="App">
			<Modal
				isOpen={isModalOpen}
				closeTimeoutMS={500}
				// We use redux to dispatch an action that closes the modal
				onRequestClose={() => dispatch(closeModal())}
				className={styles.modalContent}
				overlayClassName={styles.overlay}
			>
				<div className={styles.modalHeader}>
					<h1>
						Instructions for {selectedRecipe.servings}{" "}
						{selectedRecipe.servings === 1 ? "serving" : "servings"}
					</h1>
					<i>Ready in {selectedRecipe.readyInMinutes} minutes</i>
				</div>
				{renderSteps}
				{renderButtons}
			</Modal>
			<BrowserRouter>
				<Navigation />
				<Route
				// For more info about animations check here -> https://reactcommunity.org/react-transition-group/transition-group
					render={({ location }) => (
						<TransitionGroup>
							<CSSTransition
								key={location.key}
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
								<Switch location={location}>
									<Route path="/" exact component={InitialPage} />
									<Route path="/search" component={Search} />
									<Route path="/myRecipes" component={MyRecipes} />
									<Route path="/recipeForm" component={RecipeFormModal} />
									<Route path="/aboutMe" component={AboutMe} />
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
