import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import chatService from '../service/chatService';
import ChatForm from '../components/ChatForm';
import { withAuth } from '../providers/AuthProvider';
import DeleteChat from '../components/DeleteChat';
import { checkEqual } from "../helpers/conditionals";
import { connect } from 'react-redux';
import { sendError } from '../actions/errorActions';

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
    const { push } = this.props.history;
    const { sendError } = this.props;
    try {
      const chat = await chatService.getChat(id)
      const { messages } = chat[0]
      this.setState({
        messages: [...messages],
        isLoaded: true
      })
    } catch(error) {
      sendError(error)
      push('/error')
    }
  }

  handleClick = async (event, id, participant) => {
    const { push } = this.props.history;
    const { sendError } = this.props;
    try {
      await chatService.deleteMessage(id, participant);
      this.searchChats();
    } catch(error) {
      sendError(error)
      push('/error')
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

export default  connect(null, { sendError })(withAuth(withRouter(DisplayChat)));