import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TextPlugin, TweenLite, TimelineLite} from 'gsap';
import 'gsap/TextPlugin'; 

export default class Tagline extends Component {
  constructor(props) {
    super(props);
    let self = this;
    this.startGlitching = this.startGlitching.bind(this);
    this.state = {
      done:false, 
      ghost: 'ambient intelligence',
      set2: [
        'ambient intelligence',
        'decentralized systems',
        'blockchain technology'
    ]};

    this.set1 = [
      'technologists',
      'mathematicians',
      'engineers'
    ];

    this.set3 = [
      'healthcare',
      'finance',
      'education'
    ];
    this.tlp1 = new TimelineLite();
  }
  componentDidMount() {
    let self = this;
    setTimeout(()=> {
      
      self.tlp1.to(self.main, 0.5, {css:{opacity:1}, delay:0})
        .to(self.part1, 0.6, {css:{opacity:1}, delay:0});

      for(let i = 1; i < self.set1.length; i++) {
        self.tlp1.to(self.box1, 0.5, {text: '', delay:0.7});
        self.tlp1.to(self.box1, 0.5, {text: this.set1[i], delay:0});
        
      }
      self.tlp1.to(self.part21, 0.6, {css:{opacity:1}, delay:0.7});
      self.tlp1.to(self.part22, 0.6, {css:{opacity:1}, delay:0.7});

      self.tlp1.to(self.part3, 0.6, {css:{opacity:1}, delay:0.7});

      self.tlp1.to(self.box3, 0.8, {text:'healthcare', delay:0});
      self.tlp1.to(self.box3, 0.8, {text:'healthcare, finance', delay:0});
      self.tlp1.to(self.box3, 1.2, {text:'healthcare, finance & education', delay:0});

      self.tlp1
      .to(self.finallogo, 0.5,{css:{opacity:1}, delay:0})
      .to(self.finallogo, 1.0, {text:'we are rhodium.', delay:0, onComplete:()=> {
        this.startGlitching();
      }})
    }, 0);


  }

  startGlitching() {
    this.interval = setInterval(() => {
    this.setState({ghost: this.state.set2[1]});

      setTimeout(() => {
        let shiftedSet = this.state.set2.slice(1,this.state.set2.length).concat(this.state.set2[0]);
        this.setState({
          set2: shiftedSet,
          ghost: shiftedSet[0]
        });
      }, 700);
    }, 4000);
  }
  componentWillUnmount() {
    this.tlp1.clear();
    clearInterval(this.interval);
  }

  render() {
    return (
     <div className="logo flexbox-container" >

        <div ref={(ref) => this.main = ref} style={{textAlign:'center', opacity:'0'}}>
          
          <div ref={(ref) => this.part1 = ref} style={{opacity:'0'}}>
            <span> we are </span> <span className='alternator' ref={(ref) => this.box1 = ref}>{this.set1[0]}</span>
          </div>
          <div ref={(ref) => this.part21 = ref} style={{opacity:'0'}}>
            <span> who specialize in </span>
          </div>
          <div ref={(ref) => this.part22 = ref} style={{opacity:'0', position: 'relative', textAlign:'center'}}>
            <div className='alternator glitch-before'>{this.state.ghost}</div>
             <div className='alternator glitch-after'>{this.state.ghost}</div>
            <div className='alternator glitch' style={{textAlign:'center'}} ref={(ref) => this.box2 = ref}>{this.state.set2[0]}</div>
           
          </div>
          <div ref={(ref) => this.part3 = ref} style={{opacity:'0'}}>
            <span> for </span>
            <span className='alternator' ref={(ref) => this.box3 = ref}></span>
          </div>
          <br/>
          <div style={{opacity:'0'}} ref={(ref) => this.finallogo = ref}>we are</div>
        </div>
      </div>
    );
  }
}
