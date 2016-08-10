import React, { Component } from 'react';


export default class TextAlternator extends Component {
  constructor(props) {
    super(props);
    this.intervalFn = this.intervalFn.bind(this);
    this.state = {currentWord: this.props.words[0], index: 0};
    this.interval = setInterval(this.intervalFn,this.props.timer || 5000)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  intervalFn() {
    this.setState({
      currentWord: this.props.words[(this.state.index + 1) % this.props.words.length],
      index: this.state.index + 1
    })
  }
  render() {
    return (
      <span className="alternator">
        {this.state.currentWord}
      </span>
    );
  }
}
