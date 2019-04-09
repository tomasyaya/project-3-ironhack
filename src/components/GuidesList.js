import React, { Component } from 'react';
import { withState } from '../providers/StateProvider';
import { withAuth } from '../providers/AuthProvider';
import GuideCard from './GuideCard';
import SearchInput from './SearchInput';

class GuidesList extends Component {


  state = {
    show: false
  }

  renderGuides = (arr) => (
    arr.map((guide) => (
      <div key={guide._id}>
        <GuideCard 
          title={guide.title}
          location={guide.location}
          id={guide._id}
        />
      </div>
    )  
  ))
  

  displayGuides = (state) => {
    this.setState({
      show: state
    })
  }

  render() {
    const { guides } = this.props;
    const { show } = this.state;
    return (
      <div className="search-div">
        <SearchInput
          displayGuides={this.displayGuides}
        />
        {show ? this.renderGuides(guides) : null}
      </div>
    );
  }
}

export default withAuth(withState(GuidesList));