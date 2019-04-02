import React, { Component } from 'react';
import placeService from '../service/placeService';
import { withRouter } from 'react-router-dom';

class PlaceReviews extends Component {

  state = {
    review: 0,
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (event) => {
    const { getPlace } = this.props
    event.preventDefault()
    const { review } = this.state;
    const newReview = {
      review
    }
    const { id } = this.props.match.params
    try {
      await placeService.addReview(id, newReview)
      getPlace(id)
    } catch(error) {
      console.log(error)
    }
  }
  render() {

    

    return (
      <div>
        <h3>Place Reviews</h3>
        <form onSubmit={this.handleSubmit}>
          <select name="review" onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default withRouter(PlaceReviews);