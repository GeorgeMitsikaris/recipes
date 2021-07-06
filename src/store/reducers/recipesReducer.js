const initialState = {
  selectedRecipe: {},
  isModalOpen: false
}

export const recipesReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_RECIPE':
      return {...state, selectedRecipe: action.payload, isModalOpen: true}
    case 'CLOSE_MODAL':
      return {...state, isModalOpen: false}
    default: return state;
  }
}