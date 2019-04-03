import axios from 'axios';

class GuideService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true
    });
  }

  getAll() {
    return this.api.get('/api/guides')
      .then(({data}) => data)
  }

  myGuides(){
    return this.api.get('/api/guides/user')
      .then(({data}) => data)
  }

  getGuide(id){
    return this.api.get(`/api/guide/${id}`)
      .then(({data}) => data)
  }

  toggleToFavorites(id){
    return this.api.put(`/api/favorites/${id}`)
      .then(({data}) => data)
  }

  getFavorites(){
    return this.api.get('/api/favorites')
      .then(({data}) => data)
  }

  createGuide(body) {
    return this.api.post('/api/guide', body)
      .then(({data}) => data)
  }

  removePlace(guide, place){
    return this.api.put(`/api/places/${guide}/${place}`)
      .then(({data}) => data)
  }

  deleteGuide(id) {
    return this.api.delete(`/api/${id}`)
      .then(({data}) => data)
  }

  editGuide(id, body) {
    return this.api.put(`/api/guide/${id}`, body)
      .then(({ data } )=> data)
  }

  addComment = (id, body) => {
    return this.api.put(`/api/comments/${id}`, body)
      .then(({data}) => data)
  }

  deleteComment = (guide, id) => {
    return this.api.delete(`/api/comments/${guide}/${id}`)
      .then(({data}) => data)
  }

  addMainImage = (id, body) => {
    return this.api.put(`/api/image/${id}`, body)
      .then(({data}) => data)
  }

}

const guideService = new GuideService();
export default guideService;