import React, { Component } from 'react';
import { withState } from '../providers/StateProvider';
import { checkIfEmpty } from '../helpers/conditionals';

class SearchInput extends Component {

  render() {
    const { searchGuide, getAllGuides } = this.props;
    return (
      <div>
        <input type="text" placeholder="search" name="location" onChange={(event) => {
            const { value } = event.target;
            if(!checkIfEmpty(value)){
              searchGuide(value) 
            } else {
              getAllGuides()
            }
        }}/>
      </div>
    );
  }
}

export default withState(SearchInput);