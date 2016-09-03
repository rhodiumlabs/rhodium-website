import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class Process extends Component {
  constructor(props) {
    super(props);
    this.state = {
      margins: [0,0,0]
    };
  }
  componentDidMount() {
    window.addEventListener('scroll', (e) => {
      
      let page = window.scrollY > window.innerHeight ? 1 : 0;
      let margins = page == 0 ? [ window.scrollY,0] : [window.innerHeight, window.scrollY - window.innerHeight];
      this.setState({margins:margins});
    });
  }
  render() {
    const generateTitle = (margins, titles) => {
      let range = margins/(2*window.innerHeight);
      console.log(margins, 2*window.innerHeight);
      return (<ul>
          <li className={(range >= 0 && range <= 0.33) ? 'show': ''}>{titles[0]}</li>
          <li className={(range > 0.33 && range < 0.66) ? 'show': ''}>{titles[1]}</li>
          <li className={(range > 0.66 && range <= 1) ? 'show': ''}>{titles[2]}</li>
        </ul>);
    }

    const generateText = (margins, text) => {
      let range = margins/(2*window.innerHeight);

      return (<div>
        <ReactCSSTransitionGroup>
        </ReactCSSTransitionGroup>
          <p className={(range >= 0 && range <= 0.33) ? 'show': 'hidden'}>{text[0]}</p>
          <p className={(range > 0.33 && range < 0.66) ? 'show': 'hidden'}>{text[1]}</p>
          <p className={(range > 0.66 && range <= 1) ? 'show': 'hidden'}>{text[2]}</p>
        </div>);
    }
    return (
      <div ref={(ref) => this.slideContainer = ref} 
        className="process-page" style={{overflow:'scroll', height:'400vh'}}>
        <section style={{zIndex:3, position:'fixed', height: '100vh',marginTop:-this.state.margins[0] + 'px', background:'#EEE'}}>
            <div className="mainpage container">
            <h3>
              You have the perfect piece of land. Rhodium builds premium, healthy, green beautifully-designed homes. To blend the two into a successful project takes a comprehensive site design & development process.
            </h3>
            </div>

        </section>
        <section style={{
          backgroundImage:"url('https://images.unsplash.com/photo-1445264918150-66a2371142a2?dpr=2&auto=compress,format&crop=entropy&fit=crop&w=1199&h=1499&q=80&cs=tinysrgb')",
          backgroundSize:"cover",
          backgroundPositionX:"10%",
          backgroundPositionY:((  this.state.margins[1])*5/window.innerHeight).toFixed(2) + "%",
          zIndex:2, position:'fixed', height: '100vh'}}>
          <div className="mainpage container">
            <div className="row" style={{color:'white'}}>
              <div className="five columns">
               <div className="subjects">
                <div className="list">
                <div className="indicator" style={{top: (this.state.margins[1]*100/(2*window.innerHeight)).toFixed(2)+'%'}}></div>
                {generateTitle(this.state.margins[1], ['insight', 'invent', 'implement'])}
                </div>
              </div>
              </div>
              <div className="seven columns">
              {generateText(this.state.margins[1], [
                "Lorem Ipsum is simply dummy text of the printing and \
                typesetting industry. Lorem Ipsum has been the \
                industry's standard dummy text ever since the 1500s",
                "When an unknown printer took a galley of type and scrambled it to make a type specimen book.\
                 It has survived not only five centuries, but also the leap into electronic typesetting",
                 "Remaining essentially unchanged. It was popularised in the 1960s with the release of \
                 Letraset sheets containing Lorem Ipsum passages, and more recently with desktop"
                ])}
              </div>
            </div>
           </div>
        </section>
      </div>
    );
  }
}

Process.propTypes = {};

