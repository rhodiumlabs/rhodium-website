import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {VelocityTransitionGroup} from 'velocity-react';
import TextAlternator from '../components/TextAlternator';
import 'gsap/src/minified/plugins/TextPlugin.min';
import { TextPlugin, TimelineLite} from "gsap";
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
      'dreamers',
      'creators'
    ];

    this.set2 = [
      '',
      'design strategies',
      'hack prototypes',
      'build hardware',
      'develop products',
      'engage communities',
      'create campaigns',
      'deliver applications',
      'curate experiences',
      'uncover possibilities'
    ];

    this.set3 = [
      '',
      'organizations',
      'banking',
      'startups',
      'healthcare',
      'education',
      'insurance',
      'nonprofits',
      'society',
      'your industry'
    ];
    this.tlp1 = new TimelineLite();
  }
  componentDidMount() {
    let self = this;
    setTimeout(()=> {
    let textHeight = self.box1.clientHeight / self.set1.length;
    console.log(textHeight);
    self.tlp1.to(self.main, 0.5, {css:{opacity:1}, delay:0})
      .to(self.part1, 0.6, {css:{opacity:1}, delay:0});

    for(let i = 1; i < self.set1.length; i++) {
      let y = -((i * textHeight) % (self.set1.length*textHeight));
      self.tlp1.to(self.box1, 0.2, {css:{y:y}, delay:0.6});
    }
    self.tlp1.to(self.part2, 0.5, {css:{opacity:1}, delay:0});

    for(let i = 1; i < self.set2.length; i++) {
      let y = -((i * textHeight) % (self.set2.length*textHeight));
      self.tlp1.to(self.box2, 0.2, {css:{y:y}, delay:0.6});
    }
    self.tlp1.to(self.part3, 0.6, {css:{opacity:1}, delay:0});

    for(let i = 1; i < self.set3.length; i++) {
      let y = -((i * textHeight) % (self.set3.length*textHeight));
      self.tlp1.to(self.box3, 0.2, {css:{y:y}, delay:0.6});
    }

    self.tlp1
    .to(self.part3, 0.5, {css:{opacity:0}, delay:2})
    .to(self.part2, 0.5, {css:{opacity:0}, delay:0})
    .to(self.part1, 0.5, {css:{opacity:'0'}, delay:0})
    .to(self.finallogo, 1.0, {text:'rhodium.', delay:1, onComplete:()=> {
      self.tlp1.clear();
    }})
    }, 0)


  }

  componentWillUnmount() {
    this.tlp1.clear();
  }

  render() {
    return (
     <div className="logo flexbox-container" >

        <div ref={(ref) => this.main = ref} style={{textAlign:'center', opacity:'0'}}>
          <span> we are </span> <span ref={(ref) => this.finallogo = ref} ></span>
          
          <div ref={(ref) => this.part1 = ref} style={{opacity:'0'}}>
            <div className='alternator'>
              <ul ref={(ref) => this.box1 = ref}>
                {this.set1.map(word => <li><p>{word}</p></li>)}
              </ul>
            </div>
          </div>
          <div ref={(ref) => this.part2 = ref} style={{opacity:'0'}}>
          <span > who </span>

            <div className='alternator' style={{textAlign:'left'}}>
              <ul  ref={(ref) => this.box2 = ref}>
                {this.set2.map(word => <li><p>{word}</p></li>)}
              </ul>

            </div>
          </div>
          <div ref={(ref) => this.part3 = ref} style={{opacity:'0'}}>
          <span> for the future of </span>
          <div className='alternator' style={{textAlign:'left'}}>
            <ul ref={(ref) => this.box3 = ref}>
              {this.set3.map(word => <li><p>{word}</p></li>)}
            </ul>
          </div>
          </div>
        </div>

      </div>
    );
  }
}
