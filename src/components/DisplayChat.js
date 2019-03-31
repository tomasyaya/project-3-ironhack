import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import chatService from '../service/chatService';
import ChatForm from '../components/ChatForm';
import { withAuth } from '../providers/AuthProvider';
import DeleteChat from '../components/DeleteChat';
import { checkEqual } from "../helpers/conditionals";

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

  handleClick = async (event, id, participant) => {
    try {
      await chatService.deleteMessage(id, participant);
      this.searchChats();
    } catch(error) {
      console.log(error)
    }
  }
  
  printMessages = () => {
    const { messages } = this.state;
    const { id: participant } = this.props.match.params
    const { username } = this.props.user;
    return messages.map(messages => {
      const { _id, message, author } = messages;
      
      return (
        <div key={_id} className="message-card">
          <div>
            <p>{message}</p>
            <h4>{author}</h4>
          </div>
            {checkEqual(username, author) ? 
              <DeleteChat 
                handleClick={this.handleClick}
                participant={participant}
                messageId={_id} 
              /> 
            : null} 
        </div>
      )
    })
  }

  render() {
    
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

export default withAuth(withRouter(DisplayChat));