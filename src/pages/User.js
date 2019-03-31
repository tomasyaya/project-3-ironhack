import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import  chatService  from '../service/chatService';
import DisplayChats from '../components/DisplayChat';

class User extends Component {

  handleClick = async () => {
    const { id } = this.props.match.params;
    try {
      await chatService.createChat(id)
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
        <DisplayChats />
      </div>
    );
  }
}

export default withAuth(User);