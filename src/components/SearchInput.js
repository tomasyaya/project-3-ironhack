import React, { Component } from 'react';
import { withState } from '../providers/StateProvider';
import { checkIfEmpty } from '../helpers/conditionals';

class SearchInput extends Component {

  state = {
    showButton: false,
    showGuides: false,
    value: '',
  }

  showButton = () => {
    this.setState({
      showButton: true,
    })
  }

  hideButton = () => {
    this.setState({
      showButton: false,
      value: '',
    })
  }

  showGuides = (state, value) => {
    this.setState({
      showGuides: state,
      value,
    })
  }



  render() {
    
    const { searchGuide, getAllGuides, displayGuides } = this.props;
    const { showButton, value } = this.state;
    const searchInput = <input type="text" placeholder="search" name="location" value={value} onChange={(event) => {
      const { value } = event.target;
      if(!checkIfEmpty(value)){
        searchGuide(value);
        displayGuides(true);
      } else {
        getAllGuides();
        displayGuides(false);
      }
      this.showGuides(true, value);
      this.showButton();
      }}/>
    const button = <button onClick={() => {
      displayGuides(false);
      this.hideButton();
      getAllGuides();
    }} id="kill-button"></button>;
    return (
      <div>
      {searchInput}
      {showButton ? button: null}
      </div>
    );
  }
}

export default withState(SearchInput);