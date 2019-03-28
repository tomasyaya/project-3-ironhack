import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import guideService from '../service/guideService';
import EditForm from '../components/EditForm';

class EditGuide extends Component {

  state = {
    guide: {}
  }

  componentDidMount(){
    this.getGuide()
  }

  getGuide = async () => {
    const { id } = this.props.match.params;
    try {
      const guide = await guideService.getGuide(id);
      this.setState({guide})
    } catch(error){
      console.log(error)
    }
  }

  render() {
    const { guide } = this.state;
    return (
      <div>
        <h2>Edit Guide</h2>
        <EditForm guide={guide}/>
      </div>
    );
  }
}

export default withAuth(EditGuide);