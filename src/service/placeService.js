import axios from 'axios';

class PlaceService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true
    });
  }

  getPlace(id) {
    return this.api.get(`/api/place/${id}`)
      .then(({data}) => data)
  }
  
}

const placeService = new PlaceService();
export default placeService;