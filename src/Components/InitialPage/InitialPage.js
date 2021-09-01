import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from './InitialPage.module.css';

function InitialPage() {
  const history = useHistory();
  return (
		<div className={styles.container}>
			<h1>About this app</h1>
			<p className={styles.paragraph}>
				This app is about helping out the user to search for recipes of food or
				drinks using the free version of &nbsp;
				<span>
					<a
						href='https://spoonacular.com/food-api'
						target='_blank'
						rel='noreferrer'
						className={styles.link}
					>
						Spoonacular api
					</a>
				</span>
				&nbsp; (about 140 http requests per day). After this, if the user is
				registered he can store the recipe, create a new one, and edit or delete
				an existing one.
			</p>
			<p className={styles.paragraph}>
				The database used for storing the recipes and authenticate the users is
				Google's realtime{' '}
				<span>
					<a
						href='https://firebase.google.com/'
						target='_blank'
						rel='noreferrer'
						className={styles.link}
					>
						Firebase
					</a>
				</span>
			</p>
			<p className={styles.paragraph}>
				The technologies that have been implemented is the following:
			</p>
			<ul className={styles.list}>
				<li className={styles.listItem}>
					<span>
						<a
							href='https://react-redux.js.org/'
							target='_blank'
							rel='noreferrer'
							className={styles.link}
						>
							React Redux
						</a>
					</span>
					&nbsp; for managing global state
				</li>
				<li className={styles.listItem}>
					<span>
						<a
							href='https://github.com/reduxjs/redux-thunk'
							target='_blank'
							rel='noreferrer'
							className={styles.link}
						>
							Redux Thunk
						</a>
					</span>
					&nbsp; for the asynchronous updates of the global state
				</li>
				<li className={styles.listItem}>
					<span>
						<a
							href='https://axios-http.com/docs/intro'
							target='_blank'
							rel='noreferrer'
							className={styles.link}
						>
							Axios
						</a>
					</span>
					&nbsp; for the api calls
				</li>
				<li className={styles.listItem}>
					<span>
						<a
							href='https://react-hook-form.com/'
							target='_blank'
							rel='noreferrer'
							className={styles.link}
						>
							React hook form
						</a>
					</span>
					&nbsp; for managing the forms
				</li>
				<li className={styles.listItem}>
					<span>
						<a
							href='https://github.com/jquense/yup'
							target='_blank'
							rel='noreferrer'
							className={styles.link}
						>
							Yup
						</a>
					</span>
					&nbsp; for form validation
				</li>
				<li className={styles.listItem}>
					<span>
						<a
							href='https://reactcommunity.org/react-modal/'
							target='_blank'
							rel='noreferrer'
							className={styles.link}
						>
							React Modal
						</a>
					</span>
					&nbsp; for the modals
				</li>
				<li className={styles.listItem}>
					<span>
						<a
							href='https://reactcommunity.org/react-transition-group/'
							target='_blank'
							rel='noreferrer'
							className={styles.link}
						>
							React Transition Group
						</a>
					</span>
					&nbsp; for the animations
				</li>
				<li className={styles.listItem}>
					<span>
						<a
							href='https://www.npmjs.com/package/react-toastify'
							target='_blank'
							rel='noreferrer'
							className={styles.link}
						>
							React Toastify
						</a>
					</span>
					&nbsp; for user friendly messages
				</li>
			</ul>
			<div className={styles.paragraph}>
				<p>
					Background photo by &nbsp;
					<span>
						<a
							href='https://unsplash.com/photos/0JFveX0c778'
							target='_blank'
							rel='noreferrer'
							className={styles.link}
						>
							Andy Chilton
						</a>
					</span>
				</p>
				The github link is{' '}
				<span>
					<a
						href='https://github.com/GeorgeMitsikaris/recipes-react'
						target='_blank'
						rel='noreferrer'
						className={styles.link}
					>
						here
					</a>
				</span>
			</div>
			<h2>Disclaimer</h2>
			<div className={styles.paragraph}>
				<p>
					This app is intended solely for displaying my skills as a React
					developer to the future employers and not for commercial purposes.
				</p>
				<p className={styles.paragraph}>
					Firebase is using cookies for authentication (G_AUTHUSER_H and
					G_ENABLED_IDPS) and these are the only cookies used.
				</p>
				<p className={styles.paragraph}>
					I am not responsible for any mistakes in the spelling of recipes of Spoonacular api
				</p>
			</div>
			<div
				className={styles.button}
				onClick={() => {
					history.push('/search');
				}}
			>
				Continue
			</div>
		</div>
	);
}

export default InitialPage;
