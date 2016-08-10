import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import * as MenuActions from '../actions/menuActions';
import TrianglifyComponent from '../components/TrianglifyContainer';
import TextAlternator from '../components/TextAlternator';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    const { global, menuActions } = this.props;
    return (
      <div className="flexbox-container mainpage">
          <Menu open={global.menuOpened} actions={menuActions} />
          <TrianglifyComponent/>
          <div className="main-app-container" >
            <div className="logo" style={{maxWidth:'900px'}} >
              <span>We are </span>
              <TextAlternator words={['venture builders', 'engineers', 'designers']} />
               <span> who </span>
              <TextAlternator words={['imagine', 'design', 'engineer']} timer={5000} />
              <span> cyber-physical experiences of the future </span>
            </div>
            <div className="tagline"></div>

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
