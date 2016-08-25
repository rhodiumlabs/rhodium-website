import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Trianglify from 'trianglify';

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

    this.SEPARATION = 120, this.AMOUNTX = 60, this.AMOUNTY = 40;
    this.mouseX = 0; this.mouseY = 0;
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.particles = new Array();
    this.renderer = new THREE.CanvasRenderer();

    this.renderer.setClearColor( 0xffffff ); 
    this.count = 0;
    this.onWindowResize = this.onWindowResize.bind(this);
    window.addEventListener( 'resize', this.onWindowResize, false );
  }

  componentDidMount() {
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / (window.innerHeight), 10, 4000 );
        this.camera.position.z = 3000;

        this.scene = new THREE.Scene();

        

        var PI2 = Math.PI * 2;
        var material = new THREE.SpriteCanvasMaterial( {

          color: new THREE.Color(`rgb(24,52,70)`),
          program: function ( context ) {

            context.beginPath();
            context.arc( 0, 0, 0.5, 0, PI2, true );
            context.fill();

          }

        } );
        this.camera.position.x += ( this.mouseX - this.camera.position.x ) * .05;
        this.camera.position.y += ( - this.mouseY - this.camera.position.y ) * .05;
        this.camera.lookAt( this.scene.position );
        var i = 0;

        for ( var ix = 0; ix < this.AMOUNTX; ix ++ ) {
          for ( var iy = 0; iy < this.AMOUNTY; iy ++ ) {
            
            let particle = this.particles[ i ++ ] = new THREE.Sprite( material );
            particle.position.x = ix * this.SEPARATION - ( ( this.AMOUNTX * this.SEPARATION ) / 2 );
            particle.position.z = iy * this.SEPARATION - ( ( this.AMOUNTY * this.SEPARATION ) / 2 );
            this.scene.add( particle );

          }
        }
        
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.container.appendChild( this.renderer.domElement );
        this.animate();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrame);
  }
  animate() {

      this.animationFrame = requestAnimationFrame( this.animate );
      this.renderThree();

  }

  onWindowResize() {


        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );

  }

  renderThree() {

        this.camera.position.x = 200;
        this.camera.position.y = -500;
        this.camera.lookAt( this.scene.position );

        let i = 0;

        for ( let ix = 0; ix < this.AMOUNTX; ix ++ ) {

          for ( let iy = 0; iy < this.AMOUNTY; iy ++ ) {

            let particle = this.particles[ i++ ];
            particle.position.y = ( Math.sin( ( ix + this.count ) * 0.3 ) * 50 ) +
              ( Math.sin( ( iy + this.count ) * 0.5 ) * 50 )-1000;
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


    return (<div id={'canvas-pattern'} style={{position: 'fixed', bottom: '0'}} ref={(ref)=> {this.container = ref}}/>);
  }
}

TrianglifyComponent.propTypes = {};

