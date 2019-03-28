import React, { Component } from 'react';
import guideService from '../service/guideService';
import { checkEqual } from '../helpers/conditionals';
import { withAuth } from './AuthProvider';

export const StateContext = React.createContext();

const { Provider, Consumer }  = StateContext;

export const withState = (Comp) => {
  return class WithState extends Component {
    render() {
      return (
        <Consumer>
          {(stateStore) => {
            return <Comp 
              guides={stateStore.guides}
              searchGuide={stateStore.searchGuide}
              getAllGuides={stateStore.getAllGuides}
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
    this.getAllGuides()
  }

  getAllGuides = async () => {
    const { _id: userId } = this.props.user; 
    try {
    const guides = await guideService.getAll()
    const filterGuides = guides.filter(guide => !checkEqual(guide.creator, userId))
    this.setState({
      guides: [...filterGuides]
    })
    } catch(error){
      console.log(error)
    } 
  }

  searchGuide = (search) => {
    const { guides } = this.state
    this.setState({
      guides: [...guides].filter(guide => guide.location.toLowerCase().includes(search.toLowerCase()))
    })
    console.log(guides)
  }

  render() {
      const { children } = this.props;
      const { guides }= this.state;
        return (
          <Provider value={{
            guides,
            searchGuide: this.searchGuide,
            getAllGuides: this.getAllGuides  
            }}>
            {children}
          </Provider>    
        );
    }
  }

  export default withAuth(StateProvider)
