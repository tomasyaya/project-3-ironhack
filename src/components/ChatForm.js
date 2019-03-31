import React, { Component } from 'react';
import chatService from '../service/chatService';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
class ChatForm extends Component {

  state = {
    message: ''
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
    const { id } = this.props.match.params;
    const newMessage = {
      message
    }
    try {
      await chatService.addMessage(id, newMessage)
      this.setState({
        message: '',
      })
    } catch(error){
      console.log(error)
    }
  }

  render() {
    const { message } = this.state;
    return (
      <div className="chat-form">
        <h2>New Message</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="message" placeholder="message" value={message} onChange={this.onChange}/>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default withRouter(withAuth(ChatForm));