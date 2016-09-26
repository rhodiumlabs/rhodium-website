import React,  { Component, PropTypes } from 'react';
import {Link, IndexLink} from 'react-router';
import routes from '../routes';
export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled:false
    }
  }
  componentDidMount() {
    document.addEventListener("scroll", (e) => {
      if(document.body.scrollTop > 56 && this.props.route !== '/process') {
        this.setState({scrolled:true});
      }
      else {
        this.setState({scrolled:false});
      }

    })
  }
  render() {
    let {open, actions} = this.props;
    let isProcess = this.props.route == '/process'
    return (
      <div id="menu" style={{height: isProcess ? '0px': '100px'}} className={`container ${this.state.scrolled ? 'scrolled': ''} ${open ? 'open' : ''}`}>
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
              {routes.childRoutes.map(route => 
                <li>
                  <Link activeClassName="active" 
                    onClick={actions.closeMenu} 
                    to={route.path} className="hvr-underline-from-left">{route.path.replace("/","")}</Link>
                </li>
              )}
              <li> <a className="hvr-underline-from-left" href="https://blog.rhodium.io">blog</a></li>
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