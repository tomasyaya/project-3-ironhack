import React, { Component } from 'react';
import { withState } from '../providers/StateProvider';
import GuideCard from './GuideCard';
import SearchInput from './SearchInput';

class GuidesList extends Component {


  state = {
    show: false
  }

  renderGuides = (arr) => {
    return arr.map((guide) => {
      return <GuideCard 
              key={guide._id}
              title={guide.title}
              location={guide.location}
            />
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

export default withState(GuidesList);