import React, { Component } from 'react';
import { withState } from '../providers/StateProvider';
import GuideCard from './GuideCard';

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
        {this.renderGuides(guides)}
      </div>
    );
  }
}

export default withState(GuidesList);