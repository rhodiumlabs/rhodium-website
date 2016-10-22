import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class About extends Component {
  render() {
    return (
      <div className="mainpage container">
        <div className="row">
          <div className="twelve columns">
            <h1>about us</h1>
            <h4><b>rhodium</b> is a technology studio with expertise in ambient intelligence and decentralized systems.</h4>
            <br/>
            <p>We are a multidisciplinary team who tackle challenges in healthcare, education, and finance.</p>
            <p>We apply design and engineering to rapidly gain insight,
              invent solutions and implement strategies that advance the human experience.</p>
          </div>
        </div>
      </div>
    );
  }
}

About.propTypes = {};
