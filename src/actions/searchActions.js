import { SEND_SEARCH } from './types';

export const sendSearch = (search) => dispatch => {
  console.log('inside the search action')
  dispatch({
    type: SEND_SEARCH,
    payload: search
  })
}