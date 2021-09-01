import React from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';

import { fetchRecipe } from '../../../store/actions/recipeActions';

import './Recipe.css';

const FindRecipe = ({
	title,
	missedIngredients,
	usedIngredients,
	unusedIngredients,
	recipeId
}) => {
  const dispatch = useDispatch();

	const renderMissedIngredients = missedIngredients.map((missedIngredient) => {
		const amount = Math.round(100 * (missedIngredient.amount + Number.EPSILON)) / 100
		return (
			<tr key={uuid()}>
				<td>{missedIngredient.name}</td>
				<td>{amount}</td>
				<td>{missedIngredient.unit}</td>
			</tr>
		);
	});

	const renderUsedIngredients = usedIngredients.map((usedIngredient) => {
		return (
			<tr key={uuid()}>
				<td>{usedIngredient.name}</td>
				<td>{Math.round(100 * (usedIngredient.amount + Number.EPSILON)) / 100}</td>
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
			<button className='recipe__button' onClick={() => dispatch(fetchRecipe(recipeId))}>
				Get Instructions
			</button>
		</>
	);
};

export default FindRecipe;
