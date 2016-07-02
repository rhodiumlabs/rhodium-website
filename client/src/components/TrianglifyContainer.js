import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Trianglify from 'trianglify';

export default class TrianglifyComponent extends Component {
  constructor(props) {
    super(props);
    this.pattern = Trianglify({ 
      width: window.innerWidth,
      height: 400,
      cell_size: 40,
      x_colors: 'PuRd',
      y_colors: 'Purples',
      variance: 0,
      stroke_width: 1
    }).svg();
  }

  componentDidMount() {
    
    this.canvas.appendChild(this.pattern);

    // Get all pattern polygons.
    this.polyArray = [].slice.call(this.pattern.children);
    this.polyArray.map((poly) => {

      poly.classList.add('poly', 'invisible');
    })
    // Get polygon coords and hide them.
    
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
      } else {
        self.polyArray[i].classList.add('invisible');
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
  addEventListener() {
    if(!this.mouseEvent) {
      this.polyPoints = this.polyArray.map((poly) => {
        let rect = poly.getBoundingClientRect();
        let point = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };

        return point;
      });
      this.mouseEvent = document.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
      
  }
  
  render() {
    const { counter, actions } = this.props;
    return (
        <div onMouseEnter={()=> this.addEventListener()}>
        <div id="canvas-pattern"
          
          
          ref={(canvas)=> this.canvas = canvas} />
        </div>
    );
  }
}

TrianglifyComponent.propTypes = {};

