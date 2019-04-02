import React, { Component } from 'react';
import placeService from '../service/placeService';


class RemovePlace extends Component {


  handleClick = async () => {
    const { getGuide, id } = this.props;
    try {
      await placeService.deletePlace(id);
      getGuide()
    } catch(error) {
      console.log(error)
    }
  }
  render() {
    
    return (
      <div>
        <p id="remove-place" onClick={this.handleClick}>
          remove
        </p>
      </div>
    );
  }
}

export default RemovePlace;