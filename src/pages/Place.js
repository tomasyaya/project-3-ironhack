import React, { Component } from 'react';
import placeService from '../service/placeService';
import PlaceReviews from '../components/PlaceReviews';
import { emptyArray } from '../helpers/conditionals';
import CommentForm from '../components/CommentForm';
import CommentCard from '../components/CommentCard';
import Like from '../components/Like';

class Place extends Component {

  state = {
    place: {},
    isLoaded: false,
    reviews: [],
    likesArray: [],
    totalLikes: 0,
    average: 0,
    reviewCount: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    },
    comments: []
  }

  componentDidMount() {
    this.getPlaces()
    
  }

  getPlaces = async () => {
    const { id } = this.props.match.params
    try {
      const place = await placeService.getPlace(id)
      const { reviews, comments, likes } = place
      const { likesArray } = this.state;
      this.setState({
        place,
        reviews: [...reviews],
        comments: [...comments],
        likesArray: [...likes],
        totalLikes: likesArray.length
      })
      this.sumReviews()
      this.averageReview()
      this.setState({
        isLoaded: true
      })
    } catch(error) {
      console.log(error)
    }
  }

  sumReviews = () => {
    const { reviews, reviewCount } =  this.state;
    reviews.forEach(data => {
      const { review } = data;  
      reviewCount[review] += 1;
    })
  }



  averageReview = () => {
    const { reviews } =  this.state;
    const length = reviews.length;
    const sum = reviews.reduce((acc, next) => {
      return acc + next.review
    },0)
    let average = sum / length
    this.setState({
      average,
      isLoaded: true
    })
  }

  printImages = () => {
    const { images } = this.state.place;
    return images.map(image => {
      const { url, _id } = image;
      return (
        <img src={url} key={_id} alt="pic" />
      )
    })
  }

  printComments = () => {
    const { comments } = this.state;
    return comments.map(comment => {
      const { message, author, _id: commentId, creator } = comment;
      const { id } = this.props.match.params;
      return (
        <CommentCard 
        deleteComment={placeService.deleteComment} 
        mainId={id}
        commentId={commentId}
        name={author}
        comment={message}
        stateCallback={this.getPlaces}
        creator={creator}
        key={commentId}
        />
      )
    })
  }

  render() {
    const { type, name, location, description, images } = this.state.place
    const { isLoaded, average, comments, totalLikes, reviews } = this.state;
    const { id } = this.props.match.params;
    
    return (
      <div className="place-detail-main">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{type}</p>
        <p>{location}</p>
        <div className="reviews-container">
          <PlaceReviews
            getPlace={this.getPlaces}
          />
          <Like 
            likes={placeService.likes}
            getLikes={placeService.getPlace}
            total={totalLikes}
          />
          <div className="reviews-inner">
            <h4>Reviews Average</h4>
            {!emptyArray(reviews) ? <p>{average}</p> : <p>"No reviews yet"</p>}
          </div>
        </div>
        <h4>Pictures</h4>
        <div className="place-image-container">
          {isLoaded && !emptyArray(images) ? this.printImages() : null}
        </div>
        <div className="comments-form-card">
          {isLoaded && !emptyArray(comments) ? this.printComments() : null}
          <CommentForm
            getInfo={this.getPlaces}
            addComment={placeService.addComment}
            id={id}
          />
        </div>
      </div>
    );
  }
}

export default Place;