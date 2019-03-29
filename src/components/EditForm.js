import React, { Component } from 'react';
import guideService from '../service/guideService';

class EditForm extends Component {

  state = {
    name: '',
    location: '',
    what: '',
    description: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { _id } = this.props.guide;
    const { getGuide } = this.props;
    try {
      await guideService.editGuide(_id, this.state);
      getGuide();
      this.setState({
        name: '',
        location: '',
        what: '',
        description: ''
      });
    } catch(error){
      console.log(error)
    }
  }

  render() {
    const { name, location, what, description } = this.state;
    return (
      <div>
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

export default EditForm;