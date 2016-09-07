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
      
      let page = parseInt(window.scrollY/window.innerHeight);
      console.log(window.scrollY, window.innerHeight);
      let margins = [];
      for (let i = 0 ; i < 5; i++) {
        if(i < page) {
          margins[i] = window.innerHeight;
        }
        else if (i == page) {
          margins[i] = window.scrollY - window.innerHeight*i;
        }
        else {
          margins[i] = 0;
        }
      };
      console.log(margins);
      this.setState({margins:margins});
    });
  }
  render() {
    const generateTitle = (margins, titles) => {
      let range = margins/(3*window.innerHeight);
      return (<ul>
          <li className={(range >= 0 && range <= 0.33) ? 'show': ''}>
            {titles[0]}
          </li>
          <li className={(range > 0.33 && range < 0.66) ? 'show': ''}>{titles[1]}</li>
          <li className={(range > 0.66 && range <= 1) ? 'show': ''}>{titles[2]}</li>
        </ul>);
    }

    const backgroundImage = (margins) => {
      let range = margins/(3*window.innerHeight);
      if (range >= 0 && range <= 0.33)  
        return "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?dpr=2&amp;auto=format&amp;crop=entropy&amp;fit=crop&amp;w=1199&amp;h=800&amp;q=80&amp;cs=tinysrgb";
      else if (range > 0.33 && range < 0.66)
        return "https://images.unsplash.com/photo-1462903004115-f8e27d6a3985?dpr=2&amp;auto=format&amp;crop=entropy&amp;fit=crop&amp;w=1199&amp;h=799&amp;q=80&amp;cs=tinysrgb";
      else if (range > 0.66 && range <= 1)
        return "https://images.unsplash.com/photo-1445264918150-66a2371142a2";
        
    }

    const generateHeader = (margins, titles) => {
      let range = margins/(3*window.innerHeight);
      return (<div>
          <h4 className={(range >= 0 && range <= 0.33) ? 'show': 'hidden'}>
            We explore unrealized needs and behaviors and engage stakeholders of established 
            companies and disruptive startups to awaken curiosity, create dialogue, 
            and drive actions to solve systemic challenges.

          </h4>
          <h4 className={(range > 0.33 && range < 0.66) ? 'show': 'hidden'}>
           We use our insight to dive deep into the problem and develop innovation 
            strategies to create unprecedented opportunities. We then build prototypes to validate our learnings and iterate.
          </h4>
          <h4 className={(range > 0.66 && range <= 1) ? 'show': 'hidden'}>
            We now construct functional prototypes while testing in an agile cycle. 
            In this phase, we also create a production ready prototype that 
            can scale to serve millions of your customers. We then guide you to successful commercialization.
          </h4>
        </div>);
    }

    const generateText = (margins) => {
      let range = margins/(3*window.innerHeight)*100;

      let mainText = [
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Pellentesque ex leo, congue sit amet nunc vel,
                mollis lobortis neque. In hac habitasse platea dictumst. </p>,
          <p> I need to detect if a user is scrolled to the bottom of a page. 
              If they are at the bottom of the page, when I add new content 
              to the bottom, I will automatically scroll them to the new bottom. 
              If they are not at the bottom, they are reading previous c. </p>,
          <p> I was searching for an answer but havent found an exact one.
             Here is a pure javascript solution that works with latest Firefox, 
             IE and Chrome at the time of this answer.</p>
        
      ];

      return (

            <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300} component="div">
              <ul>{['innovation labs', 'hackathons', 'investigative learning', 'discovery']
                  .map((title,i) => <li><span className={(i == parseInt(range/8.25)) ? 'highlight' : ''}>{title}</span></li>)}
              </ul>
              {mainText[parseInt(range/8.25)]}
            </ReactCSSTransitionGroup>);
    }
    const titleGenerator = (margin, titles) => {
      let range = margin/window.innerHeight;
      let step  = 1/(titles.length+1);
      
      return titles.map((title,i) => 
        <li className={range > ((i+1)*step) && range <= (i+2)*step ? 'active' : 'inactive'}>{title}</li>)
    }

    const contentGenerator = (margin, contents) => {
      let range = margin/window.innerHeight;
      let step  = 1/(contents.length);
      
      return contents.map((content,i) => 
        <div className={(range === 0 && i == 0) || (range > ((i)*step) && range <= (i+1)*step) ? 'active' : 'inactive'}>{content}</div>)
    }

    return (
      <div ref={(ref) => this.slideContainer = ref} 
        className="process-page" style={{overflow:'scroll', height:'500vh'}}>
        <section style={{zIndex:5, position:'fixed', height: '100vh',marginTop:-this.state.margins[0] + 'px', background:'#EEE'}}>
            <div className="mainpage container">
            <h3>
              You have the perfect piece of land. Rhodium builds premium, healthy, green beautifully-designed homes. 
              To blend the two into a successful project takes a comprehensive site design & development process.
            </h3>
            </div>
            <div className="arrow bounce"></div>
        </section>
        <section style={{zIndex:4, position:'fixed', height: '100vh',marginTop:-this.state.margins[2] + 'px',color:'#1a3445', background:'#c4d4e0'}}>
            <div className="mainpage container">
               <div className="four columns">
              <h1 style={{color:'#1a3445'}}>insight</h1>
                <ul className="sub-header">
                  {titleGenerator(this.state.margins[1], ['innovation labs', 'hackathons', 'investigative learning', 'discovery'])}
                </ul>
              </div>
              <div className="eight columns content-holder">

                {contentGenerator(this.state.margins[1],[<h5>We explore unrealized needs and behaviors and engage stakeholders of established 
                  companies and disruptive startups to awaken curiosity, create dialogue, 
                  and drive actions to solve systemic challenges.</h5>,
                  <h5>{'Imagine your team controlling a drone with their brain as it flies through the air competing against an AI bot\
                     while you 3D printing a VR headset.  \
                    Attendees don’t sit and listen to lectures on why technology matters - they experience it.'} </h5>,
                  <h5>{'Imagine your coworkers having the freedom to experiment and create, all while thinking of future project\
                   for your organizations. We help you drive discussion about the implications of emerging technology on the \
                    future of your industry and create a ongoing dialogue about thinking differently.'}</h5>,
                  <h5>{"You have the time, and the people— how do you get them to innovate? With curated hands-on experiences, \
                  rhodium can help beginners and challenge experts on their emerging tech skills. \
                  These refreshing learning experiences are designed to engage attendees with educational projects and the right platform."}</h5>,
                  <h5>{"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.\
                   The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, \
                   as opposed to using 'Content here, content here', making it look like readable English. \
                   Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, \
                   and a search for 'lorem ipsum' will uncover many web sites still in their infancy."}</h5>])}

              </div>
            </div>
        </section>
        <section style={{zIndex:3, position:'fixed', height: '100vh',marginTop:-this.state.margins[3] + 'px', background:'#E9C77B'}}>
            <div className="mainpage container">
              <div className="row">
                <div className="four columns">
                  <h1 style={{color:'#1a3445'}}>invent</h1>
                  <ul></ul>
                </div>
                <div className="eight columns">
                    <h5>We explore unrealized needs and behaviors and engage stakeholders 
                      of established companies and disruptive startups to awaken curiosity, 
                      create dialogue, and drive actions to solve systemic challenges.</h5>
                </div>
              </div>
              
              
            </div>
        </section>
        <section style={{zIndex:2, position:'fixed', height: '100vh',marginTop:-this.state.margins[4] + 'px', background:'#E2B49A'}}>
            <div className="mainpage container">
              <h1 style={{color:'white'}}>implement</h1>
            </div>
        </section>
        
      </div>
    );
  }
}

Process.propTypes = {};

