import React, { Component } from 'react';
import placeService from '../service/placeService';
import { checkEqual } from '../helpers/conditionals';

class EditPlace extends Component {

  state = {
    place: {},
    chatId: ''
  }

  componentDidMount() {
    this.searchPlace()
  }

  searchPlace = async () => {
    const { id } = this.props.match.params;
    try {
      const  guide = await placeService.getPlace(id)
      const { places } = guide;
      const filterPlace = places.filter(place => checkEqual(place._id, id))
      this.setState({
        place: filterPlace[0],
        chatId: guide._id
      })
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    const { name, what, location  } = this.state.place
    console.log(this.state.chatId)
    return (
      <div className="edit-places-main">
        <h2>IMPROVE PLACE</h2>
        <p>{name}</p>
        <p>{what}</p>
        <p>{location}</p>
      </div>
    );
  }
}

export default EditPlace;