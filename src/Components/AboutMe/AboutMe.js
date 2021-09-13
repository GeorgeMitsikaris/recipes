import React from 'react';
import { useHistory } from 'react-router-dom';

import photo from '../../images/george-mitsikaris.jpg';
import styles from './AboutMe.module.css';

function AboutMe() {
  const history = useHistory();
  return (
		<div className={styles.container}>
			<img src={photo} alt='George Mitsikaris' />
			<div className={styles.paragraph}>
				<p>
					My name is George Mitsikaris and I am passionate about web developing.
					My first contact with the programming languages was at 2004-2006 during
					my studies at IEK Omiros. More specifically I was introduced to C++,
					Visual Basic, Pascal, TSQL, html.
				</p>
			</div>
			<div className={styles.paragraph}>
				<p>
					In 2015 I made a conscious decision and started to learn C#, TSQL,
					HTML/CSS and soon after Javascript and jQuery. I was studying about 6
					hours per day for almoast three and a half years. In 2018 I started to learn React and in 2019 Angular.
				</p>
			</div>
			<div className={styles.paragraph}>
				<p>
					Since January 2020 I am working in Dope Studio as a .NET Developer.
					There I had the opportunity to work in a project about the cart of
					papaki.gr based on React and Typescript, and I realized that this is
					the path that I wanted to pursue as developer.
				</p>
			</div>
			<div className={styles.paragraph}>
				<p>
					I started working on this project since June on my free time and I really enjoyed it. I hope you like it too.
				</p>
			</div>
			<button className={styles.button} onClick={() => history.push('/search')}>Back to search</button>
		</div>
	);
}

export default AboutMe;
