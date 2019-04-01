import React, { Component } from 'react';
import guideService from '../service/guideService';


class RemovePlace extends Component {


  handleClick = async (guide, place) => {
    const { getGuide } = this.props;
    try {
      await guideService.removePlace(guide, place);
      getGuide()
    } catch(error) {
      console.log(error)
    }
  }
  render() {
    const { id, place } = this.props;
    return (
      <div>
        <p id="remove-place" onClick={() => {this.handleClick(id, place)}}>
          remove
        </p>
      </div>
    );
  }
}

export default RemovePlace;