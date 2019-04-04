import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { emptyArray } from '../helpers/conditionals';
import DisplayChat from '../components/DisplayChat';
import { sendError } from '../actions/errorActions';
import  chatService  from '../service/chatService';
import userService from '../service/userService';
import { connect } from 'react-redux';

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
    const { push } = this.props.history;
    const { sendError } = this.props;
    try {
      await chatService.createChat(id)
      this.checkForMessages()
    } catch(error) {
      sendError(error)
      push('/error')
    }
  }

  checkForMessages = async () => {
    const { id } = this.props.match.params;
    const { push } = this.props.history;
    const { sendError } = this.props;
    try {
      const getChat = await chatService.getChat(id)
        if(!emptyArray(getChat)) {
          this.setState({
            hasMessage: true
          })
        }
    } catch(error) {
      sendError(error)
      push('/error')
    }
  }

  getUserName = async () => {
    const { id } = this.props.match.params;
    const { push } = this.props.history;
    const { sendError } = this.props;
    try {
      const { username } = await userService.getParticipant(id);
      this.setState({
        username,
        isLoaded: true
      })
    } catch(error) {
      sendError(error)
      push('/error')
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

export default connect(null, { sendError })(withAuth(User));