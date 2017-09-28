import React from 'react';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }

    console.log(this);
  }

  render() {
    return (
      <div>
        <h3> Home </h3>
        <button> <a href="/auth/facebook">Login with Facebook</a></button>
      </div>


    )
  }
}

