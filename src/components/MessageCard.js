import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import { checkEqual } from '../helpers/conditionals';
class MessageCard extends Component {


  render() {
    const { participant: {_id: partId}, chatId } = this.props
    const { _id: userId} = this.props.user
    return (
      <div className="message-card-container">
        <h4>With: </h4>
        {checkEqual(userId, partId) ? 
          <Link to={`/${chatId}/replay`}>Open</Link>
          : <Link to={`author/${userId}`}>Open</Link>
        }
      </div>
    );
  }
}

export default withAuth(MessageCard);