import React from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Button } from 'react-bootstrap';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }

    console.log(this);
  }

  render() {
    return (
      <div className="displayBody">
        <div id="homeDisplay">
          <h2> Twenty years from now </h2>
          <h2> You will be more dissapointed  </h2>
          <h2> By the things you didn't do  </h2>
          <h2> Than by the ones you did do.  </h2>
          <h2> So throw off the bowlines.  </h2>
          <h2> Sail away from safe harbor.  </h2>
          <h2> Catch the trade winds in your sails.  </h2>
          <h2> Explore.  </h2>
          <h2> Dream.  </h2>
          <Router>
            <h2>  <Link to="/discover"> <button> Discover. </button> </Link> </h2>
          </Router>

          <h2> - Mark Twain </h2>
        </div>

      </div>


    )
  }
}

