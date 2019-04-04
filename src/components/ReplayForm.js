import React, { Component } from 'react';
import chatService from '../service/chatService';
import { checkIfEmpty } from '../helpers/conditionals';
import { connect } from 'react-redux';
import { sendError } from '../actions/errorActions';

class ReplayForm extends Component {

  state = {
    message: '',
    isEmpty: false,
    errMessage: 'Please fill all the fields'
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
      isEmpty: false
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { chatId, getMessages, sendError } = this.props;
    const { message } = this.state;
    const { push } = this.props.history;
    const newMessage = {
      message
    }
    if(checkIfEmpty(message)) {
      this.setState({
        isEmpty: true
      })
    }
    try {
      await chatService.replay(chatId, newMessage)
      this.setState({
        message: '',
      })
      getMessages()
    } catch(error){
      sendError(error)
      push('/error')
    }
  }

  render() {
    const { message, isEmpty, errMessage } = this.state;
    return (
      <div className="replay-form-div">
        {isEmpty ? <p className="error-message">{errMessage}</p> : null  }
        <form onSubmit={this.handleSubmit} className="replay-form">
          <input type="text" name="message"  placeholder="message" value={message} onChange={this.handleChange}/>
          <button type="submit">Replay</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { sendError })(ReplayForm);