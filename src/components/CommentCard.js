import React, { Component } from 'react';
import guideService from '../service/guideService';

class CommentCard extends Component {



  handleClick = async () => {
    const { commentId, guide: { _id }, getGuide } = this.props;
    try {
      const guideComment = await guideService.deleteComment(_id, commentId);
      console.log(guideComment)
      getGuide()
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { commentId, guide: { _id } } = this.props
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

export default CommentCard;