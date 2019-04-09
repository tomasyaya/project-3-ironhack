import React, { Component } from 'react';
import { withState } from '../providers/StateProvider';
import { checkIfEmpty } from '../helpers/conditionals';
import { connect } from 'react-redux';
import { sendSearch } from '../actions/searchActions';

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
    console.log(this.state)
    
    const { searchGuide, getAllGuides, displayGuides, search: { search } } = this.props;
    console.log(search)
    const { showButton, value } = this.state;
    const searchInput = <input type="text" placeholder="search" name="location" value={value} onChange={(event) => {
      const { value } = event.target;
      if(!checkIfEmpty(value)){
        searchGuide(value);
        displayGuides(true);
        this.props.sendSearch(value)
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

const mapStateToPros = state => ({
  search: state.search
})

export default connect(mapStateToPros, { sendSearch })(withState(SearchInput));