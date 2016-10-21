import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IScroll from '../components/iscroll';

import {Link} from 'react-router';
export default class Process extends Component {
  constructor(props) {
    super(props);
    this.state = {
      margins: [0,0,0]
    };
  }
  componentDidMount() {

    this.scroll = new IScroll(this.wrapper,{scrollbars: true,click:true,preventDefault: true,bounceEasing:'quadratic', mouseWheel: true, snapThreshold:'0.1',momentum: false, blockMomentum:true, snap:'.panel', momentumTimeout: 1200});
    
    this.interval = setInterval(()=> {
      if(this.scroll.currentPage.pageY !== this.state.currentPage) {
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
        <div ref={(ref) => this.wrapper = ref} style={{position:'absolute', top:'0',left:'0', width:'100%',height:'100%', overflow:'hidden'}} >
        <div ref={(ref) => this.slideContainer = ref} 
          className="process-page" style={{height:'auto',position:'absolute'}}>
          <section className={'panel'} style={{position:'relative', zIndex:5, height: window.innerHeight + 'px'}}>
              <div className="mainpage container">
              <div className="content-holder row">
              <div className="twelve columns">
                <h1>process</h1>
                <p style={{fontSize:'2.1rem'}}> 
                  We create experiences and products to train, advise, and build decentralized applications, 
                  and ambient intelligence in your industry.
                </p>
                <p style={{fontSize:'2.1rem'}}>
                  Here’s how we do it.
                </p>
              </div>
              </div>
              </div>  

              <div className="arrow bounce"></div>
          </section> 
          {contentGenerator('#1a3445','#E9C77B', '', 'We teach stakeholders of established companies to uncover the changes and  opportunities decentralized systems and ambient intelligence  will have on their industries, and where to find more information.', true)}
          {contentGenerator('#1a3445','#E9C77B','explore labs', 'Imagine your team controlling a drone with their brain as it flies through the air competing against an AI bot all while 3D printing a VR headset! With our library of cutting edge technologies, attendees won’t sit and listen to lectures on why technology matters, they’ll experience it.')}
          {contentGenerator('#1a3445','#E9C77B','seminars', 'With an in-depth look at decentralized systems and ambient intelligence, these one hour seminars create an open space for professionals to learn why they affect their industry.')}
          {contentGenerator('#1a3445','#E9C77B','workshop', 'From blockchain to AI, haptics, ambient computing and more, these two to three hour learning experiences are designed to engage professionals with educational projects that get them immersed in decentralized systems, and ambient intelligence. We educate at any level- those with no previous experience to those who are senior decentralized developers.')}

          {contentGenerator('white','#E2B49A','', 'We help you construct functional prototypes while testing in an agile cycle. In this phase, we also create a production ready prototype that can scale to serve millions of your customers. We then guide you to successful commercialization.', true)}
          {contentGenerator('white','#E2B49A','awareness', 'Hackathons and sprints give the freedom for your employees to experiment and build with decentralized systems, and ambient intelligence, they go from idea to working prototype with our expertise. They using emerging technologies to discover and own the future of the organization’s industry.')}
          {contentGenerator('white','#E2B49A','strategize',             'We define a strategy by diagnosing the problems, set guiding policies, and plan coherent actions so you know where you want to be in the fields of decentralized systems and ambient intelligence. We craft strategies and deliver clear and actionable guidance to our client to achieve big leaps forward.')}
          {contentGenerator('white','#E2B49A','market expertise',       'If your company is considering a decentralized systems or ambient intelligence implementation, we are here to help. We review and work with you to guide your business or technical choices through the field. Our expertise allow us to guide you to create the best team or product with your specific decentralized goals.')}
          {contentGenerator('white','#E2B49A','research',               'Not all ideas or problems have been solved, and our team can work together with recognized industry professionals to publish papers or use as supporting materials to fund your upcoming projects. These types of engagements require deep expertise and minimum of one month to be completed. ')}
          
          {contentGenerator('#1a3445','#c4d4e0','', 'We help you construct functional prototypes while testing in an agile cycle. In this phase, we also create a production ready prototype that can scale to serve millions of your customers. We then guide you to successful commercialization.',true)}
          {contentGenerator('#1a3445','#c4d4e0','hackathons', 'Hackathons and sprints give the freedom for your employees to experiment and build with decentralized systems, and ambient intelligence, they go from idea to working prototype with our expertise. They using emerging technologies to discover and own the future of the organization’s industry.')}
          {contentGenerator('#1a3445','#c4d4e0','proof of concept', 'Creating a decentralized systems, and ambient intelligence proof of concept or prototype requires expertise to be efficient. With our team of experts, if you need a specific project to be done well and built quickly- we are the right partner to work with.')}
          {contentGenerator('#1a3445','#c4d4e0','engineer', 'When you decide to develop a production- ready application , we know you need more than just a proof-of-concept. We apply extreme-programming and use an rapid, iterative approach to building products for physical and digital mediums. We architect your product and use our insight and strategy to help you achieve the your goal. This service requires serious commitment from the client, it is a extraordinarily technical and advanced offering.')}        
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
        <div  style={{display:'flex',position:'fixed', top: '0',height:window.innerHeight + 'px',width:'100%', alignItems:'center'}}>
            <div style={{width:'100%', maxWidth: '900px', margin:'auto', position:'relative'}}>
                <ReactCSSTransitionGroup component="div" transitionName="process-title" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                  {titleGenerator()} 
                </ReactCSSTransitionGroup>
            </div>
        </div>

        <div className={'navigation'}  style={{display:this.state.currentPage && this.state.currentPage > 0 ? 'block': 'none', position:'fixed', bottom: '0' ,width:'100%'}}>
            
            <div style={{margin:'auto', position:'relative'}}>

              <div className={'scroll-point '+(this.state.currentPage > 0 ? 'active': '')} onClick={()=>{this.setState({currentPage:0}); this.scroll.goToPage(0, 0, 1000);}}><span style={{opacity:0}}>-</span>
                <div className={'indicator'} style={{width:percentageNav(0,1)+'%', left:'10%'}}></div>
              </div>
              
              <div className={'scroll-point '+(this.state.currentPage >= 1 ? 'active': '')} onClick={()=>{this.setState({currentPage:1}); this.scroll.goToPage(0, 1, 1000);}}><span>discover</span>
                <div className={'indicator'} style={{width:percentageNav(1,5)+'%', left:'30%'}}></div>
              </div>
              
              <div className={'scroll-point '+(this.state.currentPage >= 5 ? 'active': '')} onClick={()=>{this.setState({currentPage:5}); this.scroll.goToPage(0, 5, 1000);}}><span>advise</span>
                 <div className={'indicator'} style={{width:percentageNav(5,10)+'%', left:'50%'}}></div>
              </div>
             
              <div className={'scroll-point '+(this.state.currentPage >= 10 ? 'active': '')} onClick={()=>{this.setState({currentPage:9}); this.scroll.goToPage(0, 10, 1000);}}><span>build</span>
                <div className={'indicator'} style={{width:percentageNav(10,13)+'%', left:'70%'}}></div>
              </div>
              
              <div className={'scroll-point '+(this.state.currentPage >= 14 ? 'active': '')} onClick={()=>{this.setState({currentPage:14}); this.scroll.goToPage(0, 14, 1000);}}><span style={{opacity:0}}>-</span></div>
            
            </div>
        </div>
        </div>
    );
  }
}

Process.propTypes = {};

