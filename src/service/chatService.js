import axios from 'axios';

class ChatService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true
    });
  }

  createChat (id) {
    return this.api.post(`/api/chat/${id}`)
      .then(({data}) => data)
  }

  addMessage (id, body) {
    return this.api.put(`/api/chat/${id}`, body)
      .then(({data}) => data)
  }

  replay(id, body) {
    return this.api.put(`/api/replay/${id}`, body)
      .then(({data}) => data)
  }

  getChat(id) {
    return this.api.get(`/api/chat/${id}`)
      .then(({data}) => data)
  }
  
  deleteMessage(id, participant) {
    return this.api.delete(`/api/chat/${id}/${participant}`)
      .then(({data}) => data)
  }


  getMessages(user) {
    return this.api.get(`/api/messages/${user}`)
      .then(({data}) => data)
  }

  getReplay(id) {
    return this.api.get(`/api/replay/${id}`)
      .then(({data}) => data)
  }

  deleteReplay(chatId, messageId) {
    return this.api.delete(`/api/replay/${chatId}/${messageId}`)
      .then(({data}) => data)
  }
}

const chatService = new ChatService();
export default chatService;