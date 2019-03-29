import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { withState } from '../providers/StateProvider';
import { checkIfEmpty } from '../helpers/conditionals';
import guideService from '../service/guideService';
import GuideCard from '../components/GuideCard';
import DeleteButton from '../components/DeleteButton';
import { Link } from 'react-router-dom';
import OwnGuide from '../components/OwnGuide';


class MyGuides extends Component {

  state = {
    title: '',
    location: '',
    showButton: true,
    guides: []
  }

  componentDidMount(){
    this.getMyGuides()
  }

  getMyGuides = async () => {
    try {
      const guides = await guideService.myGuides();
      this.setState({
        guides: [...guides]
      });
    } catch(error){
      console.log(error)
    } 
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { title, location } = this.state;
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
      console.log(error)
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
        <DeleteButton _id={_id} refreshGuides={this.getMyGuides} />
        <Link to={`/user/guide/${_id}`}>Improve!</Link>
      </div>
      
    })
  }

  render() {
    
    const { location, title, showButton, guides } = this.state;
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
          {!checkIfEmpty(guides) ? this.printGuides(guides) : null}
      </div>
    )
  }
}

export default  withState(withAuth(MyGuides));