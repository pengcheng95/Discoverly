import React from 'react';
import { connect } from 'react-redux'
import { changeText, changeHeading, changePoem } from '../actions'
import { bindActionCreators } from 'redux'
import * as ChangeActions from '../actions'
import axios from 'axios'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }

    console.log(this);
  }

  render() {
    return (
      <div>
        <p> Testing </p>
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