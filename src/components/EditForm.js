import React, { Component } from 'react';
import { checkEmptyFields } from '../helpers/conditionals';
import placeService from '../service/placeService';
import { connect } from 'react-redux';
import { sendError } from '../actions/errorActions';

class EditForm extends Component {

  state = {
    name: '',
    location: '',
    what: '',
    description: '',
    isError: false,
    errorMessage: 'please complete all fields'
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      isError: false
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { _id } = this.props.guide;
    const { getGuide, sendError } = this.props;
    const { push } = this.props.history;
    const { name, location, what, description } = this.state
    if(checkEmptyFields(name, location, what, description)) {
      this.setState({ isError: true })
    }
    try {      
      await placeService.newPlace(_id, this.state);
      getGuide();
      this.setState({
        name: '',
        location: '',
        what: '',
        description: '',
        isError: false
      });
    } catch(error){
      sendError(error)
      push('/error')
    }
  }

  render() {
    const { name, location, what, description, isError, errorMessage } = this.state;
    return (
      <div>
        {isError ? <p className="error-message">{errorMessage}</p> : null}
        <form className="edit-form" onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="name" value={name} onChange={this.handleChange}/>
          <input type="text" name="location" placeholder="address" value={location} onChange={this.handleChange}/>
          <input type="text" name="what" placeholder="type" value={what} onChange={this.handleChange}/>
          <textarea name="description" placeholder="description" value={description} cols="30" rows="10" onChange={this.handleChange}/>
          <button id="edit">Add</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { sendError })(EditForm);