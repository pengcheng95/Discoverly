import React from 'react';
import { connect } from 'react-redux'
import { changeText, changeHeading } from '../actions'
import { bindActionCreators } from 'redux'
import * as ChangeActions from '../actions'

// export default class App extends React.Component {

//   constructor({text, header}) {
//     super({text, header});
//     this.state = {
//     }
//     console.log(this);
//   }

//   render() {
//     return (
//       <div>
//         <p> Testing </p>
//       </div>

//     )
//   }
// }

const App = ({text, heading, actions}) => (
  <div>
    <p> test </p>
    {heading}
    {text.text}
    <button onClick={() => {
      console.log(text);
      actions.changeText({text: 'changingText'});
    }}> Click </button>
  </div>
  )


const getState = (state) => {
  console.log(state);
  return ({
    text: state.text,
    heading: state.heading
  })
}

const mapDispatch = dispatch => ({
  actions: bindActionCreators(ChangeActions, dispatch)
})





export default connect(
  getState,
  mapDispatch
  ) (App)