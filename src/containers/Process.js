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
      else if(this.state.currentPage > 9 && this.state.currentPage < 14)
        return 60+((this.state.currentPage - 9) * 4);
      else 
        return 80;
    }
    const titleGenerator = () => {

      let className = 'process-title ' + ([1,5,9].includes(this.state.currentPage) ? 'active': '');
      if(this.state.currentPage == 0) {
        return <h1 key='start' className={className} ><span></span> </h1>;
      }
      else if(this.state.currentPage >= 1 && this.state.currentPage < 5)
        return <h1 key='insight' className={className} ><span>insight</span><div className={'header-icon'} style={{opacity: this.state.currentPage == 1 ? '1': '0', backgroundImage:"url('/icons/insight.svg')"}} /></h1>;
      else if(this.state.currentPage >= 5 && this.state.currentPage < 9)
        return <h1 key='invent'  className={className}  style={{color:'white'}}>invent<div className={'header-icon'} style={{opacity: this.state.currentPage == 5 ? '1': '0', backgroundImage:"url('/icons/invent.svg')"}}/></h1>;
      else if(this.state.currentPage >= 9 && this.state.currentPage < 14)
        return <h1 key='implement' className={className} > implement<div className={'header-icon'} style={{opacity: this.state.currentPage == 9 ? '1': '0', backgroundImage:"url('/icons/implement.svg')"}}/></h1>;
      else if(this.state.currentPage == 14)
        return <h1 className={'process-title active last'} > say hello! <Link className="button" to={'/contact'}>Talk to us ></Link> </h1>;
      else 
        return null;

    }

    const contentGenerator = (color, background, title, content, header=false) => {
        return <section className='panel' style={{position:'relative', height: window.innerHeight + 'px',color:color, background:background}}>
            <div className='mainpage container'>  
              {header ? <div className="twelve columns content-holder header-page"><h6>{content}</h6></div> : 
                [<div className="four columns content-holder "><h1 style={{color:color}}>{title}</h1></div>,
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
                <p style={{fontSize:'2.1rem'}}> We create <b>products</b>, <b>services</b>, and <b>experiences</b> that hide their technological prowess, elicit delight, and demonstrate simplicity and value. 
                </p>

                <p style={{fontSize:'2.1rem'}}>Here’s how we do it.</p>
              </div>
              </div>
              </div>  

              <div className="arrow bounce"></div>
          </section> 
          {contentGenerator('#1a3445','#E9C77B', '', 'We engage stakeholders of established companies and disruptive startups to awaken curiosity, create dialogue, and drive actions to solve systemic challenges. Learn more about our insight process.', true)}
          {contentGenerator('#1a3445','#E9C77B','explore lab', 'Imagine your team controlling a drone with their brain as it flies through the air competing against an AI bot all while 3D printing a VR headset! With our library of cutting edge technologies, attendees won’t sit and listen to lectures on why technology matters, they’ll experience it.')}
          {contentGenerator('#1a3445','#E9C77B','hackathon', 'Hackathons provide the freedom to experiment and create. We help you drive discussion about the implications of emerging technology on the future of your industry and create an ongoing dialogue about thinking differently.')}
          {contentGenerator('#1a3445','#E9C77B','workshop', 'From blockchain to AI, haptics, ambient computing and more, our refreshing learning experiences are designed to engage attendees with challenging educational projects that get them deeply immersed in a range of emerging technologies.')}

          {contentGenerator('white','#E2B49A','', 'We explore unrealised needs and behaviors, and use our insight to dive deep into problems. We develop innovation strategies to create unprecedented opportunities. We then build prototypes to validate our learnings and iterate.', true)}
          {contentGenerator('white','#E2B49A','discover', 'We identify and develop new opportunities for business innovation using analytics and immersion research. We study your industry and your user through trends, human factors research, attribute mapping, and cultural validation, etc.')}
          {contentGenerator('white','#E2B49A','strategize', 'With a deeper understanding of the problem, we conduct sprints to diagnose problems, set guiding policies, and plan coherent actions. We craft strategies and deliver clear and actionable guidance to our client partners to achieve big leaps forward.')}
          {contentGenerator('white','#E2B49A','prototype', 'We love to build stuff. This is when our engineers and designers convene to conduct rapid prototyping. We build experience prototypes to validate, appearance prototypes to iterate, and PoC prototypes to understand human interaction by making powerful, complex systems elegant, simple, and compelling.')}

          {contentGenerator('#1a3445','#c4d4e0','', 'We construct functional prototypes while testing in an agile cycle. In this phase, we also create a production ready prototype that can scale to serve millions of your customers. We then guide you to successful commercialization.',true)}


          <section className={'panel'} style={{position:'relative', height: window.innerHeight + 'px',color:'#1a3445', background:'#c4d4e0'}}>
              <div className="mainpage container">
                  <div className="row">
                  <div className="four columns content-holder">
                    <h1 style={{color:'#1a3445'}}>design</h1>
                  </div>
                  <div className="eight columns content-holder">
                    <div>
                      <h6>We apply design-thinking to everything from products to services to information to create systems and human experiences that underpin modern business and life.
                      </h6>

                      <ul className="inline-list">
                          <li>Product </li> 
                          <li>Service </li> 
                          <li>Information </li> 
                          <li>Industrial </li>  
                          <li>Interaction </li> 
                          <li>Identity</li> 

                      </ul>
                      </div>
                  </div>
                </div>
              </div>
          </section>
          <section className={'panel'} style={{position:'relative', height: window.innerHeight + 'px',color:'#1a3445', background:'#c4d4e0'}}>
              <div className="mainpage container">
                  <div className="row">
                  <div className="four columns content-holder">
                    <h1 style={{color:'#1a3445'}}>develop</h1>
                  </div>
                  <div className="eight columns content-holder">
                    <div>
                      <h6>We apply extreme-programming and use an rapid, iterative approach to building products for physical and digital mediums.</h6>
                      <ul className="inline-list">
                          <li>Software  </li> 
                          <li>Firmware  </li> 
                          <li>Hardware </li> 

                      </ul>
                      </div>
                  </div>
                </div>
              </div>
          </section>

          <section className={'panel'} style={{position:'relative', height: window.innerHeight + 'px',color:'#1a3445', background:'#c4d4e0'}}>
              <div className="mainpage container">
                  <div className="row">
                  <div className="four columns content-holder">
                    <h1 style={{color:'#1a3445'}}>engineer</h1>
                  </div>
                  <div className="eight columns content-holder">
                  <div>
                      <h6>We apply extreme-programming and use an rapid, iterative approach to building products for physical and digital mediums.</h6>
                      <ul className="inline-list">
                        <li>Electrical</li>
                        <li>Mechanical </li>
                        <li>Computer</li>
                        <li>Biomedical </li>
                        <li>Manufacturing</li>
                        <li>QA/Testing</li>
                      </ul>
                      </div>
                  </div>
                </div>
              </div>
          </section>
          <section className={'panel'} style={{position:'relative', height: window.innerHeight + 'px',color:'#1a3445', background:'#c4d4e0'}}>
              <div className="mainpage container">
                  <div className="row">
                  <div className="four columns content-holder">
                    <h1 style={{color:'#1a3445'}}>productize</h1>
                  </div>
                  <div className="eight columns content-holder">
                    <div>
                      <h5>We finally focus on bringing to life the inherent value of the product, service, or experience through compelling activations.</h5>
                      <ul className="inline-list">
                        <li>Marketing</li>
                        <li>Branding </li>
                        <li>Launch</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
          </section>

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
              
              

              <div className={'scroll-point '+(this.state.currentPage >= 1 ? 'active': '')} onClick={()=>{this.setState({currentPage:1}); this.scroll.goToPage(0, 1, 1000);}}><span>insight</span>
                <div className={'indicator'} style={{width:percentageNav(1,5)+'%', left:'30%'}}></div>
              </div>
              
              <div className={'scroll-point '+(this.state.currentPage >= 5 ? 'active': '')} onClick={()=>{this.setState({currentPage:5}); this.scroll.goToPage(0, 5, 1000);}}><span>invent</span>
                 <div className={'indicator'} style={{width:percentageNav(5,9)+'%', left:'50%'}}></div>
              </div>
             
              <div className={'scroll-point '+(this.state.currentPage >= 9 ? 'active': '')} onClick={()=>{this.setState({currentPage:9}); this.scroll.goToPage(0, 9, 1000);}}><span>implement</span>
                <div className={'indicator'} style={{width:percentageNav(9,13)+'%', left:'70%'}}></div>
              </div>
              
              <div className={'scroll-point '+(this.state.currentPage >= 14 ? 'active': '')} onClick={()=>{this.setState({currentPage:14}); this.scroll.goToPage(0, 14, 1000);}}><span style={{opacity:0}}>-</span></div>
            
            </div>
        </div>
        </div>
    );
  }
}

Process.propTypes = {};

