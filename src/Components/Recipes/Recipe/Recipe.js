import React from 'react';
import { v4 as uuid } from 'uuid';

const Recipe = ({ title, missedIngredients }) => {
	const renderIngredients = missedIngredients.map((missedIngredient) => {
		return (
			<ul key={uuid()}>
				<li>{missedIngredient.name}</li>
			</ul>
		);
	});

	return (
		<div>
			<div className='search-recipe'>
				{title}
				<hr></hr>
				{renderIngredients}
			</div>
		</div>
	);
};

export default Recipe;
