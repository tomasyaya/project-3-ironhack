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

  myGuides(){
    return this.api.get('/guides/user')
      .then(({data}) => data)
  }

  getGuide(id){
    return this.api.get(`/guide/${id}`)
      .then(({data}) => data)
  }

  toggleToFavorites(id){
    return this.api.put(`/favorites/${id}`)
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
    return this.api.put(`/guide/${id}`, body)
    .then(({ data } )=> data)
  }

}

const guideService = new GuideService();
export default guideService;