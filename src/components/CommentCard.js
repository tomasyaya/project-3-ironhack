import React, { Component } from 'react';
import guideService from '../service/guideService';
import { withAuth } from '../providers/AuthProvider';

class CommentCard extends Component {



  handleClick = async () => {
    const { commentId, guide: { _id }, getGuide } = this.props;
    try {
      await guideService.deleteComment(_id, commentId);
      getGuide()
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <h4>Title</h4>
        <p>Description</p>
        <button onClick={this.handleClick}>
          X
        </button>
      </div>
    );
  }
}

export default withAuth(CommentCard);