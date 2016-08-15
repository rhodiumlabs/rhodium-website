import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {VelocityTransitionGroup} from 'velocity-react';
export default class TextAlternator extends Component {
  constructor(props) {
    super(props);
    this.intervalFn = this.intervalFn.bind(this);
    this.state = { currentWord: this.props.words[0], index: 0};
     
  }
  componentWillMount() {
    this.interval = setInterval(this.intervalFn,this.props.timer || 2000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  intervalFn() {
    this.setState({
      currentWord: this.props.words[(this.state.index + 1) % this.props.words.length],
      index: (this.state.index + 1) % this.props.words.length 
    })
  }
  render() {
    let animationProps ={}
    let enterAnimation = {
      delay:  0,
      duration:  (this.props.timer < 800) ? 0 : 400,
      style:{ position: 'relative'},
      animation: {
        rotateX: 0,
        opacity: 1,
      }
    };

    let leaveAnimation = {
      style:{ position: 'absolute', top:'0', left:'0'},
      duration: (this.props.timer < 800) ? 0 : 400, 
      animation: {
        opacity:0,
        rotateX: -90
      }
    };

    return (
  
      <div className='alternator' style={{position:'relative', display:'inline-block'}}>
        <VelocityTransitionGroup enter={enterAnimation} leave={leaveAnimation}>
            
            {
              this.props.words.map((word, i) => 
                (this.state.index == i) ? <div key={i}>{word}</div> : null
              )
            }
            
        </VelocityTransitionGroup>    
      </div>
    );
  }
}
