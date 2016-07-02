import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import TrianglifyComponent from '../components/TrianglifyContainer';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    const { counter, actions } = this.props;
    return (
      <div>
          <div className="main-app-container">
            <div className="logo">rhodium</div>
            <div className="tagline">We imagineer cyberphysical 
    experiences of the future.</div>
          </div>
          <TrianglifyComponent/>
          <div className="main-app-container">
            <div id="menu" style={{marginTop:'-300px', float:'left'}}>
              <ul>
                <li>People </li>
                <li>Our Approach </li>
                <li>Contact </li>
              </ul>
            </div>
          </div>
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
