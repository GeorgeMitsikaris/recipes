import { STORE_RECIPE } from '../actions/actionTypes';
import database from '../../firebase/firebase';

export const storeRecipe = () => async (dispatch, getState) => {
  database.ref('recipes').push(getState().recipes.selectedRecipe).then(ref => {
    console.log(ref);
    dispatch({type: STORE_RECIPE});
  })
}