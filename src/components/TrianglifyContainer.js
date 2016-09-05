import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import THREE from "three-canvas-renderer";

export default class TrianglifyComponent extends Component {
  constructor(props) {
    super(props);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 0);
    this.animate = this.animate.bind(this);
    this.state = {
      cubeRotation: new THREE.Vector3(),
    };

    this.SEPARATION = 10, this.AMOUNTX = 60, this.AMOUNTY = 40;
    this.mouseX = 0; this.mouseY = 0;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.particles = new Array();
    
  }

  componentDidMount() {
    this.count = 0.05;
    this.animate();
  }


  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrame);
  }
  render() {

  }
  animate() {
      console.log("animate!");
      this.container.width = window.innerWidth;
      this.container.height = window.innerHeight;
      this.SEPARATION = 50;
      this.context = this.container.getContext('2d');
      this.context.clearRect(0,0,window.innerWidth,window.innerHeight);

      this.context.webkitImageSmoothingEnabled=true;

      
      for( var iz = 1; iz < 30; iz ++) {
         for ( var ix = 0; ix < this.AMOUNTX; ix ++ ) {
            var x =  ix * (this.SEPARATION - iz*0.5);
            var y = ( Math.sin( ( ix + this.count+ iz) * 0.3) + 1 )*3 ;
            var scale = ( Math.sin( ( iz + this.count ) * 0.3 ) + 1 )+
              ( Math.sin( ( ix + this.count ) * 0.5 ) + 1 );
            this.context.beginPath();
            this.context.arc(x, 500+ y*8 - (40 - iz)*(iz), scale*10/iz ,0,Math.PI*2,false);
            this.context.fillStyle = "black";
            if(iz == 1) this.context.fillStyle = "red";
            if(iz == 17) this.context.fillStyle = "blue";
            this.context.stroke();
            this.context.fill();
         }
      }
      this.count += 0.05;
      requestAnimationFrame( this.animate )
  }

  onWindowResize() {


        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );

  }

  renderThree() {

        this.count = 0.05;
        let i = 0;

        for ( let ix = 0; ix < this.AMOUNTX; ix ++ ) {

          for ( let iy = 0; iy < this.AMOUNTY; iy ++ ) {

            let particle = this.particles[ i++ ];
            particle.position.y = ( Math.sin( ( ix + this.count ) * 0.3 ) * 50 ) +
              ( Math.sin( ( iy + this.count ) * 0.5 ) * 50 );
            particle.scale.x = particle.scale.y = ( Math.sin( ( ix + this.count ) * 0.3 ) + 1 ) * 4 +
              ( Math.sin( ( iy + this.count ) * 0.5 ) + 1 ) * 4;

          }

        }
 

        this.renderer.render( this.scene, this.camera );

        this.count += 0.05;

  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height


    return (<canvas id={'canvas-pattern'} style={{position: 'fixed', bottom: '0'}} ref={(ref)=> {this.container = ref}}/>);
  }
}

TrianglifyComponent.propTypes = {};

