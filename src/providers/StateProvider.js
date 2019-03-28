import React, { Component } from 'react';
import guideService from '../service/guideService';
import { withAuth } from './AuthProvider'

export const StateContext = React.createContext(
  // authStore // default value
);

const { Provider, Consumer }  = StateContext;

export const withState = (Comp) => {
  return class WithState extends Component {
    render() {
      return (
        <Consumer>
          {(stateStore) => {
            return <Comp 
              guides={stateStore.guides}
              {...this.props} />
          }}
        </Consumer>
      )
    }    
  }
}

 class StateProvider extends Component {
  state = {
    guides: []
  }

  componentDidMount(){
    guideService.getAll()
    .then(result => this.setState({guides: [...result]}))
    .catch(error => console.log(error))
  }

  

  render() {
      const { children } = this.props
      const { guides }= this.state
        return (
          <Provider value={{
            guides,  
            }}>
            {children}
          </Provider>    
        );
    }
  }

  export default withAuth(StateProvider)
