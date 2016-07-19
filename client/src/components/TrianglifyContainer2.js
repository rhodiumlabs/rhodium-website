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
    this.polysToDraw = [];
    this.ctx = null;
    this.allPolys = Trianglify({ 
        width: window.innerWidth,
        height: window.innerHeight,
        cell_size: 40,        
        x_colors: 'BuPu',
        y_colors: 'RdPu',
        variance: 50,
        stroke_width: 1
      }).polys;
    window.addEventListener('resize', this.resize);
    
  }

  componentDidMount() {
    //if(!this.mouseEvent)
    //this.ctx = this.canvas.getContext('2d');
    //this.mouseEvent = document.addEventListener('mousemove', this.onMouseMove);
    //if(!this.pattern) {
      //setTimeout(()=>this.createPattern(), 100);
    //}
    
    Trianglify({ 
        width: window.innerWidth,
        height: window.innerHeight,
        cell_size: 40,        
        x_colors: 'BuPu',
        y_colors: 'RdPu',
        variance: 50,
        stroke_width: 1
      }).canvas(this.canvas);
  }
  drawTriangle(ctx, color, vertex, clear=false) {
    if(clear) {
      ctx.globalCompositeOperation = "destination-out";
    }
    else {
      
      ctx.globalCompositeOperation = "source-over";
    }

    ctx.fillStyle = ctx.strokeStyle = color;
    
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.moveTo.apply(ctx, vertex[0]);
    ctx.lineTo(vertex[1][0],vertex[1][1]);
    ctx.lineTo(vertex[2][0],vertex[2][1]);
    ctx.fill();
    ctx.stroke();

    ctx.closePath();
  }

  resize() {
    this.ctx.canvas.width  = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
  }
  createPattern(polyIndex) {
    let ctx = this.canvas.getContext('2d');
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    
  }

  onMouseMove(e) {
    let center = {
      x: e.clientX,
      y: e.clientY
    };

    let self = this;
    self.allPolys.map((vertex, i) => {
      
      // Swap if to invert the effect.
      if (self._detectPointInCircle(vertex[1], center)) {
        if(self.polysToDraw[self.polysToDraw.length] != i){
          self.polysToDraw.push(i);
          
          setTimeout(() => {
            let index = self.polysToDraw.shift();
          },1000)
          return;
        }
          

      }
    });
  };

  _detectPointInCircle(vertex, center) {
    
    var xc = center.x;
    var yc = center.y;

    var xp = (Math.max(vertex[0][0],vertex[1][0], vertex[2][0])
             + Math.min(vertex[0][0],vertex[1][0], vertex[2][0]))/2

    var yp = (Math.max(vertex[0][1],vertex[1][1], vertex[2][1])
             + Math.min(vertex[0][1],vertex[1][1], vertex[2][1]))/2
    var isInside = Math.pow(xp - xc, 2) + Math.pow(yp - yc, 2) <= 2000;

    return isInside;
  }

  
  render() {
    const { counter, actions } = this.props;
    return (
        <canvas id="canvas-pattern"

          ref={(canvas)=> this.canvas = canvas}>
        </canvas>
    );
  }
}

TrianglifyComponent.propTypes = {};

