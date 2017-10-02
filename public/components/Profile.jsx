import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ChangeActions from '../actions'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import ToggleDisplay from 'react-toggle-display'

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    console.log('profile', this);
    this.editProfile = this.editProfile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveDescription = this.saveDescription.bind(this);
  }

  componentWillMount() {
    axios.get('/api/getUser')
      .then((res) => {
        console.log(res);
        var user = {
          username: res.data.username,
          userId: res.data.userId,
          bookmarked: res.data.bookmarked,
          description: res.data.description,
          writtenPoem: res.data.writtenPoem
        }
        this.props.actions.changeUser(user);
      })
  }

  editProfile(e) {
    e.preventDefault();
    this.setState({
      show: !this.state.show,
      description: ''
    })
  }

  handleInputChange(e) {
    e.preventDefault();
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name] : value
    })
  }

  saveDescription() {
    console.log('saveDescription')
    var newDescription = {description: this.state.description};
    axios.post('/api/updateDescription', newDescription)
      .then((res) => {
        var user = {
          username: res.data.username,
          userId: res.data.userId,
          bookmarked: res.data.bookmarked,
          description: res.data.description
        }
        this.props.actions.changeUser(user);
        this.setState({
          show: !this.state.show
        })
      })
  }

  render() {

    const bookmarked = this.props.user.bookmarked.map((bookmark, i) => {
      console.log(bookmark);
      var poemIdLink = "/poem/" + bookmark.poemId;
      return (
        <div className="bookmarked" >
          <h3><Link to={poemIdLink} style={{color: 'black'}}>{bookmark.title}</Link></h3>
          <h6> {bookmark.author} </h6>
        </div>
        )
    })

    const myPoems = this.props.user.writtenPoem.map((poem, i) => {
      console.log(poem);
      //var poemIdLink = "/poem/" + bookmark.poemId;
      return (
        <div className="bookmarked" >
          <h3>{poem.title}</h3>
          <h6> {poem.author} </h6>
        </div>
        )
    })

    return (
      <div className="profileBody">
        <h1> {this.props.user.username} </h1>
        <hr/>
        <h2> Description </h2>
        <ToggleDisplay show={!this.state.show}>
          <h4> {this.props.user.description} </h4>
        </ToggleDisplay>
        <ToggleDisplay show={this.state.show}>
          <textarea name="description" cols="60" rows="4" value={this.state.description} onChange={this.handleInputChange} placeholder={this.state.description}/>
          <br/>
          <button onClick={this.saveDescription}> Save </button>
        </ToggleDisplay>
        
        <ToggleDisplay show={!this.state.show}>
          <button onClick={this.editProfile}> Edit </button>
        </ToggleDisplay>
        <br/>
        <br/>
        <hr/>
        <h2 style={{'bottomMargin': '50px'}}> My Poems </h2>
        {myPoems}
        <hr/>
       
        <h2 style={{'bottomMargin': '50px'}}> Bookmarks </h2>
        {bookmarked}
      </div>
    )
  }
}

const getState = (state) => {
  console.log(state);
  return ({
    user: state.user
  })
}

const mapDispatch = dispatch => ({
  actions: bindActionCreators(ChangeActions, dispatch)
})

export default connect(
  getState,
  mapDispatch
  ) (Profile)

