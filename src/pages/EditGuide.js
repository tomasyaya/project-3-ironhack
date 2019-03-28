import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import guideService from '../service/guideService';

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
    console.log(this.state.guide)
    return (
      <div>
        <h2>Edit Guide</h2>
      </div>
    );
  }
}

export default withAuth(EditGuide);