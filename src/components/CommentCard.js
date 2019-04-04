import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { checkEqual } from '../helpers/conditionals';
import { connect } from 'react-redux';
import { sendError } from '../actions/errorActions';

class CommentCard extends Component {


  handleClick = async () => {
    const { commentId, mainId, stateCallback, deleteComment, sendError } = this.props;
    const { push } = this.props.history;
    try {
      await deleteComment(mainId, commentId);
      stateCallback()
    } catch(error) {
      sendError(error)
      push('/error')
    }
  }

  render() {
    const { _id: userId } = this.props.user
    const { creator, name, comment } = this.props;
    const button = <button onClick={this.handleClick}> X </button>
    
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

export default connect(null, { sendError })(withAuth(CommentCard));