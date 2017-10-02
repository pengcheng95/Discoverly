import React from 'react';
import axios from 'axios';

export default class CreatePoem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      lines: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitUserPoem = this.submitUserPoem.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name] : value
    })
  }

  submitUserPoem(e) {
    e.preventDefault();
    let poemLines = this.state.lines.split('\n');
    let newPoem = {
      title: this.state.title,
      lines: poemLines
    }
    axios.post('/api/newUserPoem', newPoem)
      .then((res) => {
        if (res.data === 'failed') {
          alert('Log in first before writing');
        } else {
          alert('Created');
        }
      })

  }

  render() {
    return (
      <div className="createPoemDisplay">
        <h2> Create Poem </h2>
        <form>
          <label>
            <h4> Title: </h4>
            <input name="title" type="text" value={this.state.title} onChange={this.handleInputChange} />
            <br/>
            <h4> Lines: </h4>
            <textarea name="lines" cols="70" rows="16" value={this.state.lines} onChange={this.handleInputChange} />
          </label>
          <br/>
          <br/>
          <button onClick={this.submitUserPoem}> Submit </button>
        </form>
      </div>


    )
  }
}

