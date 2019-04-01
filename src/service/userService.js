import axios from 'axios';

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true
    });
  }

  getParticipant(id) {
    return this.api.get(`/api/participant/${id}`)
      .then(({data}) => data)
  }
  
}

const userService = new UserService();
export default userService;