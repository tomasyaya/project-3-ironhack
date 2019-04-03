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
              getTotalLikes={stateStore.sumLikes}
              totalLikes={stateStore.likes}
              {...this.props} />
          }}
        </Consumer>
      )
    }    
  }
}

 class StateProvider extends Component {
  state = {
    guides: [],
    likesArray: [],
    likes: 0
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

  sumLikes = (likesInPlace) => {
    const { likesArray } = this.state
    this.setState({
      likesArray: [...likesArray, ...likesInPlace],
      likes: likesArray.length
    })
  }

  render() {
      const { children } = this.props;
      const { guides, likes }= this.state;
        return (
          <Provider value={{
            guides,
            searchGuide: this.searchGuide,
            getAllGuides: this.getAllGuides,
            sumLikes: this.sumLikes,
            likes
            }}>
            {children}
          </Provider>    
        );
    }
  }

  export default withAuth(StateProvider)
