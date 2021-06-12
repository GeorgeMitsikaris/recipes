import React, { useState } from 'react';

function Search() {
	const [recipe, setRecipe] = useState('');

	return (
		<div>
			<h3>Search for recipes</h3>
			<input
				value={recipe}
				onChange={e => {setRecipe(e.target.value)}}
			/>
		</div>
	);
}

export default Search;
