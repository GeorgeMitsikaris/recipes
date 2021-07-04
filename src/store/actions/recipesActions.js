import axios from 'axios';

export const fetchSteps = (recipeId) => async dispatch => {
  const { data } = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${process.env.REACT_APP_SPOONACULAR}`);
  dispatch({ type: 'GET_STEPS', payload: data[0].steps });
}

export const closeModal = () => {
  return {
    type: 'CLOSE_MODAL',
  }
}
