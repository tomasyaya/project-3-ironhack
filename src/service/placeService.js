import axios from 'axios';

class PlaceService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true
    });
  }

  getPlace(id) {
    return this.api.get(`/place/one/${id}`)
      .then(({data}) => data)
  }

  newPlace(id, body){
    return this.api.post(`/place/${id}`, body)
      .then(({data}) => data)
  }

  getPlaces(id) {
    return this.api.get(`/place/${id}`)
      .then(({data}) => data)
  }

  deletePlace(id) {
    return this.api.delete(`/place/${id}`)
      .then(({data}) => data)
  }

  addImage = (id, body) => {
    return this.api.put(`/place/${id}`, body)
      .then(({data}) => data)
  }
  
}

const placeService = new PlaceService();
export default placeService;