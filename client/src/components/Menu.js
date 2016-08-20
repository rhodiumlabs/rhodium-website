import '../styles/menu.scss';
import React,  { Component, PropTypes } from 'react';
import {Link, IndexLink} from 'react-router';
export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled:false
    }
  }
  componentDidMount() {
    document.addEventListener("scroll", (e) => {
      if(document.body.scrollTop > 56) {
        this.setState({scrolled:true});
      }
      else {
        this.setState({scrolled:false});
      }

    })
  }
  render() {
    let {open, actions} = this.props;
    return (
      <div id="menu" className={`container ${this.state.scrolled ? 'scrolled': ''} ${open ? 'open' : ''}`}>
        <div className="row">
        <div className="twelve columns">
        <div>
          <Link to={'/'} id={'logo-header'} onClick={actions.closeMenu}></Link>
          <div id="nav-icon" onClick={actions.toggleMenu}>
            <div></div>
            <div id="disap"></div>
            <div></div>
          </div>
        </div>
        
          <div className={"open-menu " + (open ? 'open': '')}>
            <ul className="main-menu" >
              <li> <IndexLink activeClassName="active" to={'/'} onClick={actions.closeMenu} className="hvr-underline-from-left">home</IndexLink> </li>
              <li> <Link activeClassName="active" onClick={actions.closeMenu} to={'/about'} className="hvr-underline-from-left">about</Link></li>
              <li> <Link activeClassName="active" onClick={actions.closeMenu} to={'/people'} className="hvr-underline-from-left">people </Link></li>
              <li> <a    className="hvr-underline-from-left" href="https://blog.rhodium.io">blog</a></li>
              <li> <Link activeClassName="active" onClick={actions.closeMenu} to={'/contact'} className="hvr-underline-from-left">contact</Link></li>
            </ul>
          </div>
          </div>
          </div>
      </div>
    );
  }
}
Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
}