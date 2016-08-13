import '../styles/menu.scss';
import React,  { Component, PropTypes } from 'react';
import {Link} from 'react-router';
export default class Menu extends Component {
  render() {
    let {open, actions} = this.props;
    return (
      <div id="menu" className={open ? 'open' : ''}>
        <Link to={'/'} id={'logo-header'} onClick={actions.closeMenu}></Link>
        <div id="nav-icon" onClick={actions.toggleMenu}>
          <div></div>
          <div id="disap"></div>
          <div></div>
        </div>
        {open ?
          <div className="open-menu">
            <ul className="main-menu" >
              <li> <Link to={'/'} onClick={actions.closeMenu} className="hvr-underline-from-left">home</Link> </li>
              <li> <Link onClick={actions.closeMenu} to={'/about'} className="hvr-underline-from-left">about</Link></li>
              <li> <Link onClick={actions.closeMenu} to={'/people'} className="hvr-underline-from-left">people </Link></li>
              <li> <a className="hvr-underline-from-left" href="https://blog.rhodium.io">blog</a></li>
              <li> <Link onClick={actions.closeMenu} to={'/contact'} className="hvr-underline-from-left">contact</Link></li>
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