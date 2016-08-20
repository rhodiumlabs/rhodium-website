import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class About extends Component {
  render() {
    return (
      <div className="mainpage container flexbox-container">
        <div className="row" >
        <div className="twelve columns" style={{marginLeft: '1em'}}>
        <h1 style={{marginBottom: '2em'}}>about us</h1>
        <p>We are entering an era powered by a fusion of emerging technologies 
        across the physical and digital domains that have the potential to create 
        unprecedented value. </p>

        <p>Rhodium collaborates with organizations 
        to develop cyber-physical products and experiences 
        that address systemic and frontline challenges 
        across a range of industries. </p>

      <p>We work with clients to develop bespoke innovation 
      strategies that are made tangible and attainable through 
      research, collaborative innovation, product design & development, 
      engineering, and rapid prototyping.</p>
      
        </div>
      </div>
      </div>
    );
  }
}

About.propTypes = {};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
