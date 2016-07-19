import '../styles/menu.scss';
import React,  { Component, PropTypes } from 'react';

export default class Menu extends Component {
  render() {
    console.log(this.props)
    return (
      <div id="menu" className={this.props.open ? 'open' : ''}>
        <div id={'logo-header'}></div>
        <div id="nav-icon"  onClick={this.props.actions.toggleMenu} >
          <div></div>
          <div id="disap"></div>
          <div></div>
        </div>

        <div className="open-menu">
          <ul className="main-menu">
            <li className="hvr-underline-from-left">Our Aproach</li>
            <li className="hvr-underline-from-left">People</li>
            <li className="hvr-underline-from-left">Blog</li>
            <li className="hvr-underline-from-left">Contact</li>
          </ul>
        </div>
      </div>
    );
  }
}
Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
}