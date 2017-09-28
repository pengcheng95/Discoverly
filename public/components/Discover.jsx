import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ChangeActions from '../actions'
import axios from 'axios'

class Discover extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }

    console.log(this);
    this.getRandomPoem = this.getRandomPoem.bind(this);
    this.bookmark = this.bookmark.bind(this);
  }

  componentDidMount() {
    this.getRandomPoem()
  }

  getRandomPoem() {
    axios.get('/api/random')
      .then((res) => {
        console.log(res.data);
        var poem = {
          title: res.data.title,
          author: res.data.author,
          lines: res.data.lines,
          vote: null,
          poemId: res.data.poemId,
          bookmarked: false
        }
        this.props.actions.changePoem(poem);
      })
  }

  bookmark() {
    var poem = this.props.poem;
    var newBookmark = {
      title: poem.title,
      author: poem.author,
      poemId: poem.poemId
    }
    axios.post('/api/addBookmark', newBookmark)
      .then((res) => {
        var user = {
          username: res.data.username,
          userId: res.data.userId,
          bookmarked: res.data.bookmarked
        }
        this.props.actions.changeUser(user);
      })
  }

  render() {
    const lines = this.props.poem.lines.map((line, i) => {
      return (
        <p> {line} </p>
        )
    })
    return (
      <div>
        <h3> Discover </h3>

        <h5> {this.props.poem.title} </h5>
        <h5> {this.props.poem.author} </h5>
        <p> {lines} </p>
        <button onClick = {this.getRandomPoem}> Next </button>
        <button onClick = {this.bookmark}> Bookmark </button>
      </div>


    )
  }
}


const getState = (state) => {
  console.log(state);
  return ({
    poem: state.poem
  })
}

const mapDispatch = dispatch => ({
  actions: bindActionCreators(ChangeActions, dispatch)
})

export default connect(
  getState,
  mapDispatch
  ) (Discover)



