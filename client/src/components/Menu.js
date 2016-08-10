import '../styles/menu.scss';
import React,  { Component, PropTypes } from 'react';
import {Link} from 'react-router';
export default class Menu extends Component {
  render() {
    let {open, actions} = this.props;
    return (
      <div id="menu" className={open ? 'open' : ''}>
        <Link to={'/'} id={'logo-header'} href='/'></Link>
        <div id="nav-icon"  onClick={actions.toggleMenu} >
          <div></div>
          <div id="disap"></div>
          <div></div>
        </div>
        {open ?
          <div className="open-menu">
            <ul className="main-menu" >
              <li> <Link onClick={actions.toggleMenu} to={'/about'} className="hvr-underline-from-left">Our Aproach </Link></li>
              <li> <Link onClick={actions.toggleMenu} to={'/people'} className="hvr-underline-from-left">People </Link></li>
              <li> <a className="hvr-underline-from-left" href="https://blog.rhodium.io">Blog</a></li>
              <li> <Link onClick={actions.toggleMenu} to={'/contact'} className="hvr-underline-from-left">Contact</Link></li>
            </ul>
          </div> : '' }
      </div>
    );
  }
}
Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
}