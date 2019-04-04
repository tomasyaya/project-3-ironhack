import { SEND_ERROR } from './types';

export const sendError = (errors) => dispatch => {
  dispatch({
    type: SEND_ERROR,
    payload: errors
  })
}