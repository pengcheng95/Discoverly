import React from 'react';
import { connect } from 'react-redux'
import { changeText, changeHeading, changePoem } from '../actions'
import { bindActionCreators } from 'redux'
import * as ChangeActions from '../actions'
import axios from 'axios'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './Home.jsx'
import Discover from './Discover.jsx'
import Profile from './Profile.jsx'
import Poem from './Poem.jsx'
import CreatePoem from './CreatePoem.jsx'
import style from './styles.css'
import ToggleDisplay from 'react-toggle-display'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
      
    }

  }

  componentDidMount() {
    axios.get('/api/checkSignin')
      .then((res) => {
        if (res.data === 'y') {
          this.setState({
            show: true
          })
        }
      })
  }

  render() {
    return (
      <div className="topbar">
        <ToggleDisplay show={!this.state.show}>
          <Router>
            <ul>
              <li><a href="/auth/facebook"> Log In </a></li>
              <li><Link to="/createPoem"> Write </Link></li>
              <li><Link to="/discover">Discover</Link></li>
              <li id="leftLi"><Link to="/">Home</Link></li>
           </ul>
          </Router>
        </ToggleDisplay>
        <ToggleDisplay if={this.state.show}>
          <Router>
            <ul>
              <li><Link to="/profile"> Profile </Link></li>
              <li><Link to="/createPoem"> Write </Link></li>
              <li><Link to="/discover">Discover</Link></li>
              <li id="leftLi"><Link to="/">Home</Link></li>
           </ul>
          </Router>
        </ToggleDisplay>

        <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route exact path='/discover' component={Discover}/>
            <Route exact path ='/profile' component={Profile}/>
            <Route path="/poem/:id" component={Poem}/>
            <Route exact path='/createPoem' component={CreatePoem}/>
          </div>
        </Router>
      </div>

    )
  }
}

// const App = ({text, heading, poem, actions}) => (
//   <div>
//     <p> test </p>
//     {heading}
//     {text.text}
//     {poem.title}
//     <button onClick={() => {
//       axios.get('/test')
//         .then((res) => {
//           console.log(res.data);
//           var temp = {
//             title: res.data,
//             author: '',
//             lines: '',
//             vote: null,
//             poemId: -1,
//             bookmarked: false
//           }
//           actions.changePoem(temp);
//         })
//       // actions.changeText({text: 'changingText'});
//     }}> Click </button>
//   </div>
//   )


const getState = (state) => {
  console.log(state);
  return ({
    text: state.text,
    heading: state.heading,
    poem: state.poem
  })
}

const mapDispatch = dispatch => ({
  actions: bindActionCreators(ChangeActions, dispatch)
})





export default connect(
  getState,
  mapDispatch
  ) (App)