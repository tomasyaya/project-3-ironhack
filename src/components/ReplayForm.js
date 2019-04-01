import React, { Component } from 'react';
import chatService from '../service/chatService';

class ReplayForm extends Component {

  state = {
    message: ''
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { chatId, getMessages } = this.props;
    const { message } = this.state;
    const newMessage = {
      message
    }
    try {
      await chatService.replay(chatId, newMessage)
      this.setState({
        message: '',
      })
      getMessages()
    } catch(error){
      console.log(error)
    }
  }

  render() {
    const { message } = this.state;
    return (
      <div className="replay-form-div">
        <form onSubmit={this.handleSubmit} className="replay-form">
          <input type="text" name="message"  placeholder="message" value={message} onChange={this.handleChange}/>
          <button type="submit">Replay</button>
        </form>
      </div>
    );
  }
}

export default ReplayForm;