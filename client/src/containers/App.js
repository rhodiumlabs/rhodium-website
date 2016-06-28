import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Footer from '../components/Footer';


export default class App extends Component {
  render() {
    const { counter, actions } = this.props;
    return (
      <div className="main-app-container">
        <div className="logo">rhodium</div>
        <div className="tagline">We imagineer cyberphysical 
experiences of the future.</div>
      </div>
    );
  }
}

App.propTypes = {};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
