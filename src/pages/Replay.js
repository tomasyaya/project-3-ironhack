import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import ReplayForm from '../components/ReplayForm';
import chatService from '../service/chatService';
import ReplayCard from '../components/ReplayCard';
import { emptyArray } from '../helpers/conditionals';
import { connect } from 'react-redux';
import { sendError } from '../actions/errorActions';

class Replay extends Component {

  state = {
    messages: [],
    isLoaded: false
  }

  componentDidMount() {
    this.getMessages()
  }

  getMessages = async () => {
    const { chatid } = this.props.match.params;
    const { push } = this.props.history;
    const { sendError } = this.props;
    try {
      const  { messages }  = await chatService.getReplay(chatid)
      this.setState({
        messages, 
        isLoaded: true
      })
    } catch(error) {
      sendError(error)
      push('/error')
    }
  }

  printMessages = () => {
    const { messages } = this.state;
    const { chatid } = this.props.match.params;
    return messages.map(messages => {
     const { _id, author, message } = messages;
     return (
       <ReplayCard 
        key={_id}
        author={author}
        message={message}
        messageId={_id}
        chatId={chatid}
        getMessages={this.getMessages}
       />
     )
    })
  }

  render() {
    const { chatid } = this.props.match.params;
    const { messages, isLoaded } = this.state;
    
    return (
      <div className="replay-main">
        <h1>Replay</h1>
        <div className="replay-container">
          {isLoaded && !emptyArray(messages) ? this.printMessages() : null }
        </div>
        <ReplayForm
          chatId={chatid}
          getMessages={this.getMessages}
        />
      </div>
    );
  }
}

export default connect(null, { sendError })(withAuth(Replay));