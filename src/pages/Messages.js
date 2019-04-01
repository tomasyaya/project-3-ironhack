import React, { Component } from 'react';
import chatService from '../service/chatService';
import { withAuth } from '../providers/AuthProvider';
import { emptyArray } from '../helpers/conditionals';
import MessageCard from '../components/MessageCard';

class Messages extends Component {

  state = {
    creatorMessages: [],
    participantMessages: [],
    messages: [],
    isLoaded: false
  }

componentDidMount(){
  this.getMessages()
}



getMessages = async () => {
  const creator = "creator";
  const participant = "participant"
  try {
    const sendTo = await chatService.getMessages(creator)
    const fromTo = await chatService.getMessages(participant)
    this.setState({
      creatorMessages: sendTo,
      participantMessages: fromTo,
      messages: [...sendTo, ...fromTo],
      isLoaded: true,
    })
  } catch(error) {
    console.log(error)
  }
}

recieveFromMessages = async () => {
  try {
    const message = await chatService.participantMessages()
    this.setState({
      participantMessages: message,
      isLoaded: true
    })
  } catch(error) {
    console.log(error)
  }
}


printMessages = () => {
  const { messages } = this.state;
  return messages.map(message => {
    const { _id, participant, creator } = message;
    return (
      <MessageCard 
        key={_id}
        chatId={_id}
        participant={participant}
        creator={creator}
      />
    )
  })
}

  render() {
    const { isLoaded,  messages } = this.state;
    return (
      <div className="messages-main">
        <h1>Messages</h1>
        {isLoaded && !emptyArray(messages) ? this.printMessages() : null}
      </div>
    );
  }
}

export default withAuth(Messages);