import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from './App';
import Footer from '../components/Footer';
import * as MenuActions from '../actions/menuActions';
import Menu from '../components/Menu';
/**
 * Component is exported for conditional usage in Root.js
 */
export class Root extends Component {
  render() {
    const { store, global, menuActions } = this.props;
    return (
      <div className="Site" style={{height: '100vh'}}>

          <Menu open={global.menuOpened} route={this.props.location.pathname} actions={menuActions} />

          {this.props.children}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {global: state.global};
}

function mapDispatchToProps(dispatch) {
  return {
      menuActions: bindActionCreators(MenuActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);