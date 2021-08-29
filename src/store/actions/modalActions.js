import { SET_MODAL_STATE } from '../actions/actionTypes';

export const setModalState = (payload) => {
  return {
    type: SET_MODAL_STATE,
    payload
  }
}