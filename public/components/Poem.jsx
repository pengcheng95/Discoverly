import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ChangeActions from '../actions'
import axios from 'axios'
import Comment from './Comment.jsx'

class Poem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newComment: ''
    }
    console.log(this);
    this.getPoem = this.getPoem.bind(this);
    this.newCommentChange = this.newCommentChange.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  componentWillMount() {
    this.getPoem()
  }

  getPoem() {
    axios.post('/api/poem', { poemId: this.props.match.params.id})
      .then((res) => {
        console.log(res.data);
        var poem = {
          title: res.data.title,
          author: res.data.author,
          lines: res.data.lines,
          comments: res.data.comments,
          vote: null,
          poemId: res.data.poemId,
          bookmarked: false
        }
        this.props.actions.changePoem(poem);
      })
  }

  newCommentChange(e) {
    e.preventDefault();
    this.setState({
      newComment: e.target.value
    })
    console.log(this);
  }

  submitComment(e) {
    e.preventDefault();
    axios.post('/api/newComment', {
      poemId: this.props.match.params.id,
      newComment: this.state.newComment
    })
      .then((res)=> {
        this.getPoem();
      })
  }


  render() {
    const lines = this.props.poem.lines.map((line, i) => {
      return (
        <p> {line} </p>
        )
    })

    const comments = this.props.poem.comments.map((comment, i) => {
      console.log(comment);
      return (
        <Comment comment={comment} key={i}/>
        )
    })
    return (
      <div>
        <h3> Poem </h3>

        <h5> {this.props.poem.title} </h5>
        <h5> {this.props.poem.author} </h5>
        <p> {lines} </p>
        <h5> Comments </h5>
        <textarea name="newComment" cols="60" rows="4" value={this.state.newComment} onChange={this.newCommentChange}></textarea>
        <button onClick={this.submitComment}> Submit </button>
        {comments}

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
  ) (Poem)



