import React from 'react';
import { v4 as uuid } from 'uuid';
// import axios from 'axios';
import { connect } from 'react-redux';

import { fetchSteps } from '../../../store/actions/recipesActions';

import './Recipe.css';

const Recipe = ({
	title,
	missedIngredients,
	usedIngredients,
	unusedIngredients,
	recipeId,
	fetchSteps,
}) => {
	// const [steps, setSteps] = useState([]);

	const getInstructions = async () => {
		// const { data } = await axios.get(
		// 	`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${process.env.REACT_APP_SPOONACULAR}`
		// );
    fetchSteps(recipeId);
		// setSteps(data[0].steps);
		// console.log(steps);
	};

	const renderMissedIngredients = missedIngredients.map((missedIngredient) => {
		return (
			<tr key={uuid()}>
				<td>{missedIngredient.name}</td>
				<td>{missedIngredient.amount}</td>
				<td>{missedIngredient.unit}</td>
			</tr>
		);
	});

	// const renderSteps = steps.map((step) => {
	// 	console.log(step);
	// 	return (
	// 		<div>
	// 			<p>{step.number}</p>
	// 			{step.step}
	// 		</div>
	// 	);
	// });

	const renderUsedIngredients = usedIngredients.map((usedIngredient) => {
		return (
			<tr key={uuid()}>
				<td>{usedIngredient.name}</td>
				<td>{usedIngredient.amount}</td>
				<td>{usedIngredient.unit}</td>
			</tr>
		);
	});

	const renderUnusedIngredients = unusedIngredients.map((unusedIngredient) => {
		return (
			<span className='recipe__ingredients' key={uuid()}>
				{unusedIngredient.name} <span className='recipe__dash'>-</span>
			</span>
		);
	});

	return (
		<>
			<div className='recipe__header'>{title}</div>
			<table className='recipe__table'>
				<thead>
					<tr className='recipe__table--header'>
						<th>Ingredients</th>
						<th>Amount</th>
						<th>Unit</th>
					</tr>
				</thead>
				<tbody>
					{renderUsedIngredients}
					{renderMissedIngredients}
				</tbody>
			</table>
			<div className='recipe__unused'>
				<strong>Unused Ingredients:</strong>
				{renderUnusedIngredients}
			</div>
			<button className='recipe__button' onClick={() => getInstructions()}>
				Get Instructions
			</button>
			{/* {renderSteps} */}
		</>
	);
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSteps: recipeId => dispatch(fetchSteps(recipeId))
  }
}

export default connect(null, mapDispatchToProps)(Recipe);
