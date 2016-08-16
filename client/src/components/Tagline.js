import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {VelocityTransitionGroup} from 'velocity-react';
import TextAlternator from '../components/TextAlternator';
import 'gsap/src/minified/plugins/TextPlugin.min'
import { TextPlugin, TimelineLite } from "gsap";
export default class Tagline extends Component {
  constructor(props) {
    super(props);

    let self = this;
    this.state = {done:false}

    this.set1 = [
      'artists',
      'inventors',
      'hobbyists',
      'engineers',
      'experts',
      'instructors',
      'technologists',
      'programmers',
      'dreamers',
      'innovators'
    ];

    this.set2 = [
      '',
      'craft designs',
      'hack prototypes',
      'build hardware',
      'develop products',
      'engage communities',
      'run campaigns',
      'make applications',
      'code solutions',
      'create experiences',
      'reimagine'
    ];

    this.set3 = [
      '',
      'organizations',
      'banking',
      'startups',
      'healthcare',
      'educations',
      'insurance',
      'nonprofits',
      'enterprises',
      'society',
      'your industry'
    ];
    this.tlp1 = new TimelineLite();
  }
  componentDidMount() {



    this.tlp1.to(this.main, 0.5, {css:{opacity:1}, delay:0})
      .to(this.part1, 0.6, {css:{opacity:1}, delay:0});

    for(let i = 1; i < this.set1.length; i++) {
      let y = -((i * 50) % (this.set1.length*50));
      this.tlp1.to(this.box1, 0.2, {css:{y:y}, delay:0.6});
    }
    this.tlp1.to(this.part2, 0.5, {css:{opacity:1}, delay:0});

    for(let i = 1; i < this.set2.length; i++) {
      let y = -((i * 50) % (this.set2.length*50));
      this.tlp1.to(this.box2, 0.2, {css:{y:y}, delay:0.6});
    }
    this.tlp1.to(this.part3, 0.6, {css:{opacity:1}, delay:0});

    for(let i = 1; i < this.set3.length; i++) {
      let y = -((i * 50) % (this.set3.length*50));
      this.tlp1.to(this.box3, 0.2, {css:{y:y}, delay:0.6});
    }


    this.tlp1
    .to(this.part3, 0.5, {css:{opacity:0}, delay:2})
    .to(this.part2, 0.5, {css:{opacity:0}, delay:0})
    .to(this.part1, 0.5, {css:{opacity:'0'}, delay:0})
    .to(this.finallogo, 1.0, {text:'rhodium.', delay:1, onComplete:()=> {
      this.tlp1.clear();
    }})

  }

  componentWillUnmount() {
    this.tlp1.clear();
  }

  render() {
    return (
     <div className="logo">

        <div style={{opacity:'0', textAlign:'center'}}></div>
        <div ref={(ref) => this.main = ref} style={{textAlign:'center', opacity:'0'}}>
          <span> we are </span> <span ref={(ref) => this.finallogo = ref} ></span>
          <div ref={(ref) => this.part1 = ref} style={{opacity:'0'}}>
            <div className='alternator'>
              <ul ref={(ref) => this.box1 = ref}>
                {this.set1.map(word => <li>{word}</li>)}
              </ul>
            </div>
          </div>
          <div ref={(ref) => this.part2 = ref} style={{opacity:'0'}}>
          <span > who </span>

            <div className='alternator' style={{textAlign:'left'}}>
              <ul  ref={(ref) => this.box2 = ref}>
                {this.set2.map(word => <li>{word}</li>)}
              </ul>

            </div>
          </div>
<<<<<<< HEAD
          <div ref={(ref) => this.part3 = ref} style={{opacity:'0'}}>
          <span> for the future of </span>
          <div className='alternator' style={{textAlign:'left'}}>
=======
          <div ref={(ref) => this.part3 = ref} style={{opacity:'0', marginTop:'0.2em'}}>
          <span> for </span>
          <div className='alternator'>
>>>>>>> bda4a5100680ba7e6d4017fee8be5c0c0f9eece3
            <ul ref={(ref) => this.box3 = ref}>
              {this.set3.map(word => <li>{word}</li>)}
            </ul>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
