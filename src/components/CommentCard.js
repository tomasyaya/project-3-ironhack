import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { checkEqual } from '../helpers/conditionals';

class CommentCard extends Component {


  handleClick = async () => {
    const { commentId, mainId, stateCallback, deleteComment } = this.props;
    try {
      await deleteComment(mainId, commentId);
      stateCallback()
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { _id: userId } = this.props.user
    const { creator, name, comment } = this.props;
    const button = <button onClick={this.handleClick}> X </button>
    console.log(this.props)
    return (
      <div className="comment-card">
        <div>
          <h4>{name}</h4>
          <p>{comment}</p>
        </div>
        {checkEqual(userId, creator) ? button : null}
      </div>
    );
  }
}

export default withAuth(CommentCard);