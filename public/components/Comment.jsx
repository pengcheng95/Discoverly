import React from 'react';

export default class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }

    console.log('comment', this);
  }

  render() {
    return (
      <div>
        <h6> {this.props.comment.username} </h6>
        <p> {this.props.comment.comment} </p>
      </div>


    )
  }
}

