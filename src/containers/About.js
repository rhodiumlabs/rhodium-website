import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class About extends Component {
  render() {
    return (
      <div className="mainpage container">
        <div className="row" >
        <div className="twelve columns">
        <h1>about us</h1>
        <h4><b>rhodium</b> is an innovation studio for emerging technology.</h4>
        <br/>
<p>We are on a mission to advance humanity by using technology as a transformative tool.</p>

<p>We approach industries with a new perspective, uncover unrealized needs, behaviors, 
and aspirations. We dive deep into the challenges, diagnose problems, and solve it as our own. </p>

<p>We do this by developing bespoke innovation strategies that are made tangible 
and attainable through collaboration, research, design, and engineering.</p>

<p>We are neither a  vendor for design & engineering services, nor a prototyping shop. 
Instead we are hands-on partners with our clients to help craft strategies, 
build experiences and help companies succeed with emerging technology.</p>
      
        </div>
      </div>
      </div>
    );
  }
}

About.propTypes = {};
