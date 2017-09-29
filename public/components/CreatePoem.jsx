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
        console.log(res);
      })

  }

  render() {
    return (
      <div>
        <h3> Create Poem </h3>
        <form>
          <label>
            Title:
            <br/>
            <input name="title" type="text" value={this.state.title} onChange={this.handleInputChange} />
            <br/>
            Lines: 
            <br/>
            <textarea name="lines" cols="60" rows="4" value={this.state.lines} onChange={this.handleInputChange} />
          </label>
          <br/>
          <button onClick={this.submitUserPoem}> Submit </button>
        </form>
      </div>


    )
  }
}

