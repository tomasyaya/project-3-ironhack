import React, { Component } from 'react';
import placeService from '../service/placeService';
import { connect } from 'react-redux';
import { sendError } from '../actions/errorActions';
import { withRouter } from 'react-router-dom';


class RemovePlace extends Component {


  handleClick = async () => {
    const { getGuide, id, sendError } = this.props;
    const { push } = this.props.history;
  
    try {
      await placeService.deletePlace(id);
      getGuide()
    } catch(error) {
      sendError(error)
      push('/error')
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

export default connect(null, { sendError })(withRouter(RemovePlace));