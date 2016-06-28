import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import Footer from '../components/Footer';

/**
 * Component is exported for conditional usage in Root.js
 */
export default class Root extends Component {
  render() {
    const { store, } = this.props;
    return (
      <div className="Site">
        <header></header>
        <main className="Site-content">{this.props.children}</main>
        <Footer/>
      </div>
    );
  }
};
