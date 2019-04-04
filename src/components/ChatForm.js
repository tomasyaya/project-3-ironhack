import React, { Component } from 'react';
import chatService from '../service/chatService';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import { connect } from 'react-redux';
import { sendError } from '../actions/errorActions';

class ChatForm extends Component {

  state = {
    message: '',
    errMessage: 'plase write something',
    error: false
  }


  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { message } = this.state;
    if(!message) {
      this.setState({ error: true })
    }
    const { id } = this.props.match.params;
    const { searchChat, sendError } = this.props
    const { push } = this.props.history;
    const newMessage = {
      message
    }
    try {
      await chatService.addMessage(id, newMessage)
      this.setState({
        message: '',
        error: false
      })
      searchChat();
    } catch(error){
      sendError(error)
      push('/error')
    }
  }

  render() {
    const { message, error, errMessage } = this.state;
    return (
      <div className="chat-form">
        <h2>New Message</h2>
        {error ? <p className="error-message">{errMessage}</p> : null }
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="message" placeholder="message" value={message} onChange={this.onChange}/>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { sendError })(withRouter(withAuth(ChatForm)));