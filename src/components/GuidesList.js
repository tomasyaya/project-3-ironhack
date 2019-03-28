import React, { Component } from 'react';
import { withState } from '../providers/StateProvider';
import GuideCard from './GuideCard';
import SearchInput from './SearchInput';

class GuidesList extends Component {


  renderGuides = (arr) => {
    return arr.map((guide) => {
      return <GuideCard 
              key={guide._id}
              title={guide.title}
              location={guide.location}
            />
    })
  }

  render() {
    const { guides } = this.props
    return (
      <div>
        <SearchInput />
        {this.renderGuides(guides)}
      </div>
    );
  }
}

export default withState(GuidesList);