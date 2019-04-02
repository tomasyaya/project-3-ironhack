import React, { Component } from 'react';
import placeServices from '../service/placeService';
import { checkEqual } from '../helpers/conditionals';
import { withAuth } from '../providers/AuthProvider';

class PlaceComment extends Component {

  handleClick = async () => {
    const { getPlaces, id } = this.props;
    try {
      await placeServices.deleteComment(id);
      getPlaces()
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { _id: userId } = this.props.user
    const { creator, author, message } = this.props
    const button = <button onClick={this.handleClick}> X </button>
    console.log(this.props)
    return (
      <div className="comment-card">
        <div>
          <h4>{author}</h4>
          <p>{message}</p>
          {button}
        </div>
        {/* {checkEqual(userId, creator) ? button : null} */}
      </div>
    );
  }
}

export default withAuth(PlaceComment);