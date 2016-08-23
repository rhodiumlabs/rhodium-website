import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import * as MenuActions from '../actions/menuActions';
import Tagline from '../components/Tagline';
import TrianglifyComponent from '../components/TrianglifyContainer';
import TextAlternator from '../components/TextAlternator';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    const { global, menuActions } = this.props;
    return (
      <div>
          
          <TrianglifyComponent />
          <div className="mainpage container flexbox-container">
            <div className="row">
              <Tagline/>
              <div className="tagline"></div>

            </div>
          </div>
      </div>
    );
  }
}

App.propTypes = {};

function mapStateToProps(state) {
  return {global: state.global};
}

function mapDispatchToProps(dispatch) {
  return {menuActions: bindActionCreators(MenuActions, dispatch)};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
