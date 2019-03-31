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
  
}

const chatService = new ChatService();
export default chatService;