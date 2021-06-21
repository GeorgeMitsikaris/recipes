import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const Recipe = ({ title, missedIngredients, recipeId }) => {
  const [steps, setSteps] = useState();

  const getInstructions = async () => {
    const { data } = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${process.env.REACT_APP_SPOONACULAR}`);
    const stepsObj = data[0];
    setSteps(stepsObj.steps);
    console.log(steps);
  }

	const renderIngredients = missedIngredients.map((missedIngredient) => {
		return (
			<ul key={uuid()}>
				<li>{missedIngredient.name}</li>
			</ul>
		);
	});

	return (
		<div>
      <div>
			  {title}
      </div>
      <button onClick={() => getInstructions()}>Get Instructions</button>
			<hr></hr>
			{renderIngredients}
		</div>
	);
};

export default Recipe;
