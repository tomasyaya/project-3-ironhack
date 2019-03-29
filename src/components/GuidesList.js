import React, { Component } from 'react';
import { withState } from '../providers/StateProvider';
import { withAuth } from '../providers/AuthProvider';
import GuideCard from './GuideCard';
import SearchInput from './SearchInput';
import { Link } from 'react-router-dom';

class GuidesList extends Component {


  state = {
    show: false
  }

  renderGuides = (arr) => {
    return arr.map((guide) => {
      return <div key={guide._id}>
        <GuideCard 
          title={guide.title}
          location={guide.location}
        />
        <Link to={`/guide/${guide._id}`}>Check it!</Link>
      </div>
      
    })
  }

  displayGuides = (state) => {
    this.setState({
      show: state
    })
  }

  render() {
    const { guides } = this.props;
    const { show } = this.state;
    return (
      <div>
        <SearchInput
          displayGuides={this.displayGuides}
        />
        {show ? this.renderGuides(guides) : null}
      </div>
    );
  }
}

export default withAuth(withState(GuidesList));