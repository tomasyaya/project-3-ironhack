import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import  chatService  from '../service/chatService';
import DisplayChat from '../components/DisplayChat';
import userService from '../service/userService';
import { emptyArray } from '../helpers/conditionals';

class User extends Component {

  state = {
    username: '',
    hasMessage: false,
    isLoaded: false
  }

  componentDidMount(){
    this.checkForMessages()
    this.getUserName();
  }

  handleClick = async () => {
    const { id } = this.props.match.params;
    try {
      await chatService.createChat(id)
      this.checkForMessages()
    } catch(error) {
      console.log(error)
    }
  }

  checkForMessages = async () => {
    const { id } = this.props.match.params;
    try {
      const getChat = await chatService.getChat(id)
        if(!emptyArray(getChat)) {
          this.setState({
            hasMessage: true
          })
        }
    } catch(error) {
      console.log(error)
    }
  }

  getUserName = async () => {
    const { id } = this.props.match.params;
    try {
      const { username } = await userService.getParticipant(id);
      this.setState({
        username,
        isLoaded: true
      })
    } catch(error) {
      console.log(error)
    }
  }
  
  render() {
    const { hasMessage, isLoaded, username } = this.state;
    return (
      <div className="user-main-div">
        {isLoaded ? <h2>{username}</h2> : null}
        <button onClick={this.handleClick}>New</button>
        {hasMessage ? <DisplayChat /> : null}
      </div>
    );
  }
}

export default withAuth(User);