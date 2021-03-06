import React, { Component } from 'react';
import { checkIfEmpty, checkEmptyFields } from '../helpers/conditionals';
import { withState } from '../providers/StateProvider';
import DeleteButton from '../components/DeleteButton';
import { withAuth } from '../providers/AuthProvider';
import { sendError } from '../actions/errorActions';
import guideService from '../service/guideService';
import OwnGuide from '../components/OwnGuide';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class MyGuides extends Component {

  state = {
    title: '',
    location: '',
    showButton: true,
    guides: [],
    validation: false,
    message: 'Please complete all fields'
  }

  componentDidMount(){
    this.getMyGuides()
  }

  getMyGuides = async () => {
    const { push } = this.props.history;
    const { sendError } = this.props;
    try {
      const guides = await guideService.myGuides();
      this.setState({
        guides: [...guides]
      });
    } catch(error){
      sendError(error)
      push('/error')
    } 
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      validation: false
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { title, location } = this.state;
    const { push } = this.props.history;
    const { sendError } = this.props;
    if(checkEmptyFields(title, location)) {
      this.setState({
        validation: true
      })
      return
    }
    const guide = {
      title,
      location,
    }
    try {
      await guideService.createGuide(guide)
      this.setState({
        title: '',
        location: '',
        showButton: true,
      });
      await this.getMyGuides()
    } catch(error) {
      sendError(error)
      push('/error')
    }
  }

  showFrom = () => {
    this.setState({
      showButton: false
    })
  }

  printGuides = (arr) => {
    return arr.map(guide => {
      const { title, location, _id } = guide;
      return <div key={_id} className="own-guides-div">
        <OwnGuide title={title} location={location} />
        <Link to={`/user/guide/${_id}`}>Improve!</Link>
        <DeleteButton _id={_id} refreshGuides={this.getMyGuides} />
      </div>
      
    })
  }

  render() {
    
    const { location, title, showButton, guides, message, validation } = this.state;
    const button = <button onClick={this.showFrom}>New</button>
    const createForm = <form className="create-guide-form" onSubmit={this.handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" value={ title } onChange={this.handleChange}/>
      <label htmlFor="title">Location</label>
      <input type="text" name="location" value={ location } onChange={this.handleChange}/>
      <button type="submit">Create</button>
    </form>

    return ( 
      <div className="my-guides-main">
        <h2>My Guides</h2>

        {showButton ? button : createForm}
        {validation ? <p className="error-message">{message}</p> : null}
        {!checkIfEmpty(guides) ? this.printGuides(guides) : null}
      </div>
    )
  }
}

export default connect(null, { sendError })(withState(withAuth(MyGuides)));


