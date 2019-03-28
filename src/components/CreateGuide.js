import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { withState } from '../providers/StateProvider';
import { checkIfEmpty } from '../helpers/conditionals';
import guideService from '../service/guideService';
import GuideCard from '../components/GuideCard';
import DeleteButton from './DeleteButton';



class CreateGuide extends Component {

  state = {
    title: '',
    location: '',
    showButton: true,
    guides: []
  }

  componentDidMount(){
    this.getMyGuides()
  }

  getMyGuides = () => {
    guideService.myGuides()
      .then(guides => {
        this.setState({
          guides: [...guides]
        })
      })
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
        showButton: true,
      });
    });
  }

  showFrom = () => {
    this.setState({
      showButton: false
    })
  }

  printGuides = (arr) => {
    return arr.map(guide => {
      const { title, location, _id } = guide;
      return <div key={_id}>
        <GuideCard title={title} location={location} />
        <DeleteButton id={_id} refreshGuides={this.getMyGuides} />
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
      <div>
          <h2>My Guides</h2>
          {showButton ? button : createForm}
          {!checkIfEmpty(guides) ? this.printGuides(guides) : null}
      </div>
    )
  }
}

export default  withState(withAuth(CreateGuide));