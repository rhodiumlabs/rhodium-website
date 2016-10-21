import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IScroll from '../components/iscroll';
import {Link} from 'react-router';


const PageSection = (props) => {
  const contentGenerator = (color, background, title, _content, header=false) => {
      return <section className='panel' style={{position:'relative', height: window.innerHeight + 'px',color:color, background:background}}>
          <div className='mainpage container'>
            {header ? <div className="twelve columns content-holder header-page"><h6><span>{props.children}</span></h6></div> :
              [<div className="four columns content-holder "><h3 style={{color:color}}>{title}</h3></div>,
              <div className="eight columns content-holder"><h6>{content}</h6></div>]
            }
          </div>
      </section>
  }

  return contentGenerator(props.color, props.background, props.title, props.content, props.header ? true : false);
}


export default class Process extends Component {
  constructor(props) {
    super(props);
    this.state = {
      margins: [0,0,0]
    };
  }

  componentDidMount() {
    this.scroll = new IScroll(this.wrapper, {
      scrollbars: true,
      click: true,
      preventDefault: true,
      bounceEasing: 'quadratic',
      mouseWheel: true,
      snapThreshold: '0.1',
      momentum: false,
      blockMomentum: true,
      snap: '.panel',
      momentumTimeout: 1200
    });

    this.interval = setInterval(() => {
      if (this.scroll.currentPage.pageY !== this.state.currentPage) {
        this.setState({currentPage: this.scroll.currentPage.pageY});
      }
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const navigationWidth = () => {
      if(typeof(this.state.currentPage) === "undefined" ) {
        return 0;
      }
      else if(this.state.currentPage == 0)
        return 0;
      else if(this.state.currentPage >= 1 && this.state.currentPage <= 5)
        return 20+(this.state.currentPage - 1) * 5;
      else if(this.state.currentPage > 5 && this.state.currentPage <= 9)
        return 40+((this.state.currentPage - 5) * 5);
      else if(this.state.currentPage > 10 && this.state.currentPage < 14)
        return 60+((this.state.currentPage - 10) * 4);
      else
        return 80;
    }

    const titleGenerator = () => {
      let className = 'process-title ' + ([1,5,10].includes(this.state.currentPage) ? 'active': '');
      if(this.state.currentPage == 0) {
        return <h1 key='start' className={className} ><span></span> </h1>;
      }
      else if(this.state.currentPage >= 1 && this.state.currentPage < 5)
        return <h1 key='discover' className={className} > discover <div className={'header-icon'} style={{opacity: this.state.currentPage == 1 ? '1': '0', backgroundImage:"url('/icons/insight.svg')"}} /></h1>;
      else if(this.state.currentPage >= 5 && this.state.currentPage < 10)
        return <h1 key='advise'  className={className} style={{color:'white'}}> advise <div className={'header-icon'} style={{opacity: this.state.currentPage == 5 ? '1': '0', backgroundImage:"url('/icons/invent.svg')"}}/></h1>;
      else if(this.state.currentPage >= 10 && this.state.currentPage < 14)
        return <h1 key='build' className={className} > build<div className={'header-icon'} style={{opacity: this.state.currentPage == 10 ? '1': '0', backgroundImage:"url('/icons/implement.svg')"}}/></h1>;
      else if(this.state.currentPage == 14)
        return <h1 className={'process-title active last'} >  <Link to={'/contact'} className='say-hello'>say hello!</Link> </h1>;
      else
        return null;
    }

    const contentGenerator = (color, background, title, content, header=false) => {
        return <section className='panel' style={{position:'relative', height: window.innerHeight + 'px',color:color, background:background}}>
            <div className='mainpage container'>
              {header ? <div className="twelve columns content-holder header-page"><h6>{content}</h6></div> :
                [<div className="four columns content-holder "><h3 style={{color:color}}>{title}</h3></div>,
                <div className="eight columns content-holder"><h6>{content}</h6></div>]
              }
            </div>
        </section>
    }

    const percentageNav = (start, end) => {
      if(!this.state.currentPage) return 0;
      if(this.state.currentPage > end) return 16;
      if(this.state.currentPage >= start) return 16*((this.state.currentPage-start)/(end-start));
      return 0
    }

    return (
      <div
          ref={(ref) => this.wrapper = ref}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height:'100%',
            overflow:'hidden'
          }}>
        <div
            ref={(ref) => this.slideContainer = ref}
            className="process-page"
            style={{height: 'auto', position: 'absolute'}}>

          <section className={'panel'} style={{position:'relative', zIndex:5, height: window.innerHeight + 'px'}}>
            <div className="mainpage container">
              <div className="content-holder row">
                <div className="twelve columns">
                  <h1>process</h1>
                  <p style={{fontSize: '2.1rem'}}>
                    We offer training, advisory, and development of decentralized applications,
                    and ambient intelligence for your industry.
                  </p>
                  <p style={{fontSize: '2.1rem'}}>
                    Here’s how we do it.
                  </p>
                </div>
              </div>
            </div>
            <div className="arrow bounce"></div>
          </section>



          <PageSection color="#1a3445" background="#E9C77B" title="" header={true}>
            Vie work with stakeholders of established companies to
            uncover the changes and  opportunities that emerging tech will
            have on their industries and where to find more information.
          </PageSection>






          {contentGenerator(
            '#1a3445',
            '#E9C77B',
            'explore labs',
            'Imagine your team controlling a drone with wearable technology competing against a bot. You don’t sit and listen to lectures on why technology matters - you experience it. '
          )}


          {contentGenerator('#1a3445','#E9C77B','seminars', 'With an in-depth look at smart contracts, cryptocurrencies, and connected devices, these one hour seminars create an space for you to learn why they are affecting your industry.')}
          {contentGenerator('#1a3445','#E9C77B','workshop', 'From blockchain to AI, haptics, and ambient computing, these three hour hands on experiences are designed to immerse you in the inner workings of these fields and apply new concepts to your experience.')}

          {contentGenerator('white','#E2B49A','', 'We dive deep into your industry\'s potential. You take advantage of upcoming opportunities and face challenges head on with our advice.', true)}
          {contentGenerator('white','#E2B49A','awareness', 'We identify and develop business innovation using analytics and immersion research. We work with you to understand the industry and users through trends, human factors research, attribute mapping, and cultural validation.')}
          {contentGenerator('white','#E2B49A','strategize',             'We define a strategy by diagnosing the problems, set guiding policies, and plan coherent actions so you achieve big leaps forward when the opportunity arises.')}
          {contentGenerator('white','#E2B49A','industry',       'If your company is considering a new implementations using these technologies, we are here to help. We work with you to create the best team, make technical choices, and conduct your business throughout the field.')}
          {contentGenerator('white','#E2B49A','research',               'Not all ideas or problems have been solved. Our team work together with recognized industry professionals to publish papers or use as supporting materials to fund upcoming projects.')}

          {contentGenerator('#1a3445','#c4d4e0','', 'We help you construct functional prototypes while testing in an agile cycle. From sprinting to the most innovative ideas or end to end productization, we help you create the next best solution.',true)}
          {contentGenerator('#1a3445','#c4d4e0','hackathons','Hackathons and sprints give you the freedom to experiment with new technologies in established industries. You can go from idea to working prototype with our guides and mentors to discover the future of your organization’s industry')}
          {contentGenerator('#1a3445','#c4d4e0','experiment', 'Our team help you uncover and build specific proof of concepts for your business’s needs and strategy. We work with you to gain insight, invent and implement solutions in a fast-paced setting.')}
          {contentGenerator('#1a3445','#c4d4e0','engineer', 'We apply extreme-programming and use an rapid, iterative approach to building products. By architecting your product and using our insights we help you set and achieve your goals. This service requires serious commitment from you, as it is a extraordinarily technical and advanced offering.')}

          <section className={'panel'} style={{position:'relative', height: window.innerHeight + 'px',color:'#1a3445'}}>
              <div className="mainpage container">
                  <div className="row">
                  <div className="twelve columns content-holder">
                  </div>
                </div>
              </div>
          </section>
        </div>

        {/*** Dynamic content without moving ***/}
        <div style={{
          display: 'flex',
          position: 'fixed',
          top: '0',
          height: window.innerHeight + 'px',width:'100%',
          alignItems: 'center'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '900px',
              margin: 'auto',
              position: 'relative'
          }}>
            <ReactCSSTransitionGroup
                component="div"
                transitionName="process-title"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
              {titleGenerator()}
            </ReactCSSTransitionGroup>
          </div>
        </div>

        <div
            className={'navigation'}
            style={{
              display: this.state.currentPage && this.state.currentPage > 0 ? 'block': 'none',
              position: 'fixed',
              bottom: '0',
              width:'100%'
            }}>

          <div style={{margin:'auto', position:'relative'}}>
            <div
                className={'scroll-point '+(this.state.currentPage > 0 ? 'active': '')}
                onClick={() => {this.setState({currentPage:0}); this.scroll.goToPage(0, 0, 1000);}}>
              <span style={{opacity:0}}>-</span>
              <div className={'indicator'} style={{width: percentageNav(0, 1) + '%', left: '10%'}}></div>
            </div>
            <div
                className={'scroll-point '+(this.state.currentPage >= 1 ? 'active': '')}
                onClick={() => {
                  this.setState({currentPage: 1});
                  this.scroll.goToPage(0, 1, 1000);
                }}>
              <span>discover</span>
              <div className={'indicator'} style={{width: percentageNav(1,5)+'%', left: '30%'}}></div>
            </div>
            <div
                className={'scroll-point '+(this.state.currentPage >= 5 ? 'active' : '')}
                onClick={() => {
                  this.setState({currentPage:5});
                  this.scroll.goToPage(0, 5, 1000);
                }}>
              <span>advise</span>
              <div className={'indicator'} style={{width:percentageNav(5,10)+'%', left:'50%'}}></div>
            </div>
            <div
                className={'scroll-point '+(this.state.currentPage >= 10 ? 'active' : '')}
                onClick={() => {
                  this.setState({currentPage:9});
                  this.scroll.goToPage(0, 10, 1000);
                }}>
              <span>build</span>
              <div
                className={'indicator'}
                style={{width: percentageNav(10, 13)+'%', left: '70%'}}></div>
            </div>
            <div
                className={'scroll-point '+(this.state.currentPage >= 14 ? 'active': '')}
                onClick={() => {
                  this.setState({currentPage: 14});
                  this.scroll.goToPage(0, 14, 1000);
                }}>
              <span style={{opacity: 0}}>-</span>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

Process.propTypes = {};
