import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Trianglify from 'trianglify';

export default class TrianglifyComponent extends Component {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.createPattern = this.createPattern.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.addEventListener = this.addEventListener.bind(this);
    window.addEventListener('resize', this.resize);
  }

  componentDidMount() {
    if(!this.mouseEvent)
      this.mouseEvent = document.addEventListener('mousemove', this.onMouseMove);
    if(!this.pattern) {
      setTimeout(()=>this.createPattern(), 500);
    }
    
  }

  resize() {
    let self = this;
    this.polyPoints.forEach((point, i) => {
       self.polyArray[i].classList.add('invisible');
     }
    );
    setTimeout(()=>{this.createPattern()},500)
  }
  createPattern() {
      if(this.pattern) {
        this.canvas.removeChild(this.pattern);
        this.pattern = null;
        this.polyArray = []
      } 
      this.pattern = Trianglify({ 
        width: window.innerWidth,
        height: window.innerHeight,
        cell_size: 40,
        x_colors: 'BuPu',
        y_colors: 'RdPu',
        variance: 50,
        stroke_width: 1
      }).svg();

      this.polyArray = [].slice.call(this.pattern.children)
                        .map((point) => {point.classList.add('invisible'); return point } );
      this.canvas.appendChild(this.pattern);
      this.addEventListener(this.polyArray);
  }

  onMouseMove(e) {

    let radius = 100;
    let center = {
      x: e.clientX,
      y: e.clientY
    };

    let self = this;
    self.polyPoints.forEach((point, i) => {
      
      // Swap if to invert the effect.
      if (self._detectPointInCircle(point, radius, center)) {
        self.polyArray[i].classList.remove('invisible');
        setTimeout(() => {
          self.polyArray[i].classList.add('invisible');
        },1000)
      }
    });
  };

  _detectPointInCircle(point, radius, center) {
    var xp = point.x;
    var yp = point.y;

    var xc = center.x;
    var yc = center.y;

    var d = radius * radius;

    var isInside = Math.pow(xp - xc, 2) + Math.pow(yp - yc, 2) <= d;

    return isInside;
  }
  addEventListener(polyArray) {
    this.polyPoints = polyArray.map((poly) => {
      let rect = poly.getBoundingClientRect();
      let point = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      return point;
    });

      
  }
  
  render() {
    const { counter, actions } = this.props;
    return (
        <div id="canvas-pattern"

          ref={(canvas)=> this.canvas = canvas}>
        </div>
    );
  }
}

TrianglifyComponent.propTypes = {};

