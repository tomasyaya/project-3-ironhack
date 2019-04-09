import { SEND_SEARCH } from '../actions/types';

const initialState = {
  search: ''
}

export default function(state = initialState, action){
  switch(action.type){
    case SEND_SEARCH:
    console.log('inside the send search')
    console.log(state.search)
     return {
      ...state,
      search: action.payload
     }
    default:
    return state;
  }
}