import React, { Component } from 'react';

class DeleteChat extends Component {
  render() {
    const { handleClick, participant, messageId } = this.props
    return (
      <div>
        <button onClick={(event) => {handleClick(event, messageId, participant)}}>
          X
        </button>
      </div>
    );
  }
}

export default DeleteChat;