import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import chatService from '../service/chatService';
import ChatForm from '../components/ChatForm';

class DisplayChat extends Component {

  state = {
    messages: [],
    isLoaded: false
  }

  componentDidMount() {
    this.searchChats()
  }

  searchChats =  async () => {
    const { id } = this.props.match.params;
    try {
      const chat = await chatService.getChat(id)
      const { messages } = chat[0]
      this.setState({
        messages: [...messages],
        isLoaded: true
      })
      console.log(this.state)
    } catch(error) {
      console.log(error)
    }
  }
  
  printMessages = () => {
    const { messages } = this.state;
    return messages.map(message => (
      <div key={message._id} className="message-card">
        <p>{message.message}</p>
        <h4>{message.author}</h4>
      </div>
    ))
  }

  render() {
    const { id } = this.props.match.params
    const { isLoaded } = this.state
    return (
      <>
        <div className="display-chat-main">
          <div className="display-chat-inner">
            {isLoaded ? this.printMessages() : null }
          </div>
        </div>
        <ChatForm 
          searchChat={this.searchChats}
        />
      </>
    );
  }
}

export default withRouter(DisplayChat);