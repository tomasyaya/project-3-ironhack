import React, { Component } from 'react';
import { checkEqual } from '../helpers/conditionals';
import { withAuth } from '../providers/AuthProvider';
import  chatService from '../service/chatService'; 
import { connect } from 'react-redux';
import { sendError } from '../actions/errorActions';

class ReplayCard extends Component {


  handleClick = async () => {
    const { chatId, messageId, getMessages, sendError } = this.props;
    const { push } = this.props.history;
    try {
      await chatService.deleteReplay(chatId, messageId);
      getMessages()
    } catch(error) {
      sendError(error)
      push('/error')
    }
  }

  render() {
    const { author, message, user } = this.props
    const button = <button onClick={this.handleClick} >
      X
    </button>
    return (
      <div className="replay-card">
        <div>
          <p>{message}</p>
          <h4>{author}</h4>
        </div>
        {checkEqual(user.username, author) ? button : null}
      </div>
    );
  }
}

export default connect(null, { sendError })(withAuth(ReplayCard));