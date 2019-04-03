import { SEND_ERROR } from './types';

export const sendError = () => dispatch => {
  //SEND ERROR FUNCTION
  dispatch({
    type: SEND_ERROR,
    payload: "error"
  })
}