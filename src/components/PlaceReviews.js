import React, { Component } from 'react';
import placeService from '../service/placeService';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendError } from '../actions/errorActions';

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
    event.preventDefault()
    const { getPlace, sendError } = this.props
    const { id } = this.props.match.params
    const { push } = this.props.history;
    const { review } = this.state;
    const newReview = {
      review
    }
    try {
      await placeService.addReview(id, newReview)
      getPlace(id)
    } catch(error) {
      sendError(error)
      push('/error')
    }
  }
  render() {

    

    return (
      <div>
        <h3>Leave Review</h3>
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

export default connect(null, { sendError })(withRouter(PlaceReviews));