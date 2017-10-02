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
      <div className="poemDisplay">
        <div className="poem">
          <h2> {this.props.poem.title} </h2>
          <h3> <small> {this.props.poem.author} </small> </h3>
          <div className="lines">
            <p> {lines} </p>
          </div>
        </div>
        <br/>
        <hr/>
        <br/>
        <h3> Comments </h3>
        <textarea wrap="soft" name="newComment" cols="60" rows="4" value={this.state.newComment} onChange={this.newCommentChange}></textarea>
        <br/>
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



