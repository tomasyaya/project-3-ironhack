import axios from 'axios';

class GuideService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000/api/',
      withCredentials: true
    });
  }

  getAll() {
    return this.api.get('/guides')
      .then(({data}) => data)
  }

  createGuide(body) {
    return this.api.post('/guide', body)
      .then(({data}) => data)
  }


  deleteGuide(id) {
    return this.api.delete(`/${id}`)
      .then(({data}) => data)
  }

  editGuide(id, body) {
    return this.api.put(`/${id}`, body)
    .then(({ data } )=> data)
  }

}

const guideService = new GuideService();
export default guideService;