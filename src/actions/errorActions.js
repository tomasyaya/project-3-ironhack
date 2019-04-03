import { SEND_ERROR } from './types';

export const sendError = (errors) => dispatch => {
  console.log('inside the action')
  dispatch({
    type: SEND_ERROR,
    payload: errors
  })
}