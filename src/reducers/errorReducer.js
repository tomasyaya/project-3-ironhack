import { SEND_ERROR } from '../actions/types';

const initialState = {
  error: ''
}

export default function(state = initialState, action){
  switch(action.type){
    case SEND_ERROR:
    console.log('inside the reducer')
    console.log(action.payload)
    console.log(state)
     return {
      error: action.payload
     }
    default:
    return state;
  }
}