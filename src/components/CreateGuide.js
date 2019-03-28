import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { withState } from '../providers/StateProvider';
import guideService from '../service/guideService';
import Redirect from 'react-router-dom/Redirect';

class CreateGuide extends Component {

  state = {
    title: '',
    location: '',
    redirect: false,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, location } = this.state;
    const guide = {
      title,
      location,
    }
    guideService.createGuide(guide)
      .then(()=>{
        this.setState({
        title: '',
        location: '',
        redirect: true,
      });
      console.log(this.state)
      });
  }


  render() {
    const {location, title , redirect} = this.state;
    return ( 
    <div>
      {redirect ? <Redirect to='/'/> : (<div>
        <h2>Create Guide</h2>
        <form className="create-guide-form" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" value={ title } onChange={this.handleChange}/>
          <label htmlFor="title">Location</label>
          <input type="text" name="location" value={ location } onChange={this.handleChange}/>
          <button type="submit">Create</button>
        </form>
      </div>)}
    </div>
    )
  }
}

export default  withState(withAuth(CreateGuide));