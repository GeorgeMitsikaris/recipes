import React from 'react';
import { connect } from 'react-redux';

import styles from './MyRecipes.module.css';
import database from '../../firebase/firebase';

function MyRecipes({userId}) {
  console.log(userId);
  if (userId) {
    database
		.ref(userId)
		.once('value')
		.then((snapshot) => {
      const recipes = [];
      snapshot.forEach(snapshotChild => {
        recipes.push(snapshotChild.val())
      });
      console.log(recipes);
		});
  }
  return (
    <div>
      
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
  }
}

export default connect(mapStateToProps)(MyRecipes);
