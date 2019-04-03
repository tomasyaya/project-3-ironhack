import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import { checkEqual } from '../helpers/conditionals';
class MessageCard extends Component {


  render() {
    const { participant: {_id: partId}, chatId, creator, participant } = this.props
    const { _id: userId, username} = this.props.user
    
    return (
      <div className="message-card-container">
        <h4>With: {checkEqual(username, creator.name) ? participant.username : creator.username}</h4>
        {checkEqual(userId, partId) && checkEqual(userId, creator._id) ? 
          <Link to={`author/${creator._id}`}>Open</Link> :
          <Link to={`/${chatId}/replay`}>Open</Link> 
        }
      </div>
    );
  }
}

export default withAuth(MessageCard);