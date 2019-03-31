import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import  chatService  from '../service/chatService';
import ChatForm from '../components/ChatForm';

class User extends Component {

  handleClick = async () => {
    const { id } = this.props.match.params;
    try {
      const chat = await chatService.createChat(id)
      console.log(chat)
    } catch(error) {
      console.log(error)
    }
  }
  
  render() {
    const { id } = this.props.match.params;
    
    return (
      <div className="user-main-div">
        <h2>User</h2>
        <button onClick={this.handleClick}>New</button>
        <ChatForm />
      </div>
    );
  }
}

export default withAuth(User);