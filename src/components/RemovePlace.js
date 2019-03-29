import React, { Component } from 'react';
import guideService from '../service/guideService';
import { nextTick } from 'q';

class RemovePlace extends Component {


  handleClick = async (guide, place) => {
    try {
      const places = await guideService.removePlace(guide, place);
      console.log(places)
    } catch(error) {
      console.log(error)
    }
  }
  render() {
    console.log(this.props)
    const { id, place } = this.props;
    return (
      <div>
        <p  onClick={() => {this.handleClick(id, place)}}>
          remove
        </p>
      </div>
    );
  }
}

export default RemovePlace;