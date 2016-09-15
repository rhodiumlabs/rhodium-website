import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IScroll from '../components/iscroll';
export default class Process extends Component {
  constructor(props) {
    super(props);
    this.state = {
      margins: [0,0,0]
    };
  }
  componentDidMount() {
    let scroll = new IScroll(this.wrapper,{scrollbars: true,bounceEasing:'quadratic', mouseWheel: true, momentum: false, blockMomentum:true, snap:'.panel', momentumTimeout: 1200});

    scroll.on('scrollStart', (a) => {
      setTimeout(()=> {
         this.setState({currentPage: scroll.currentPage.pageY - 1});
      },100);
    });

  }
  render() {


    const titleGenerator = () => {
      let className = 'process-title ' + ([0,4,8,13].includes(this.state.currentPage) ? 'active': '');
      if(this.state.currentPage >= 0 && this.state.currentPage < 4)
        return <h1 key='insight' className={className} >insight</h1>;
      else if(this.state.currentPage >= 4 && this.state.currentPage < 8)
        return <h1 key='invent'  className={className} >invent</h1>;
      else if(this.state.currentPage >= 8 && this.state.currentPage < 13)
        return <h1 key='implement' className={className} style={{color:'white'}}>implement</h1>;
      else 
        return null;

    }
    const contentGenerator = (color, background, title, content, header=false) => {
        return <section className='panel' style={{position:'relative', height: '100vh',color:color, background:background}}>
            <div className='mainpage container'>  
              <div className="four columns"><h1 style={{color:color}}>{title}</h1></div>
              <div className="eight columns content-holder">{header ? <h4>{content}</h4> : <h5>{content}</h5>}</div>

            </div>
        </section>
    }
    return (
      <div>
        <div ref={(ref) => this.wrapper = ref} style={{height:'100vh',position:'fixed',top:'0', width:'100%', overflow:'hidden'}} >
        <div ref={(ref) => this.slideContainer = ref} 
          className="process-page">
          <section className={'panel'} style={{zIndex:5, position:'relative', height: '100vh',marginTop:-this.state.margins[0] + 'px', background:'#EEE'}}>
              <div className="mainpage container">
              <div className="content-holder">
              <div>
                <h3> We create <b>products</b>, <b>services</b>, and <b>experiences</b> that hide their technological prowess, elicit delight, and demonstrate simplicity and value. 
                </h3>
                <h3>Here’s how we do it.</h3>
              </div>
              </div>
              </div>  

              <div className="arrow bounce"></div>
          </section>
          {contentGenerator('#1a3445','#c4d4e0', '', 'We engage stakeholders of established companies and disruptive startups to awaken curiosity, create dialogue, and drive actions to solve systemic challenges. Learn more about our insight process.', true)}
          {contentGenerator('#1a3445','#c4d4e0','explore lab', 'Imagine your team controlling a drone with their brain as it flies through the air competing against an AI bot all while 3D printing a VR headset! With our library of cutting edge technologies, attendees won’t sit and listen to lectures on why technology matters, they’ll experience it.')}
          {contentGenerator('#1a3445','#c4d4e0','hackathon', 'Hackathons provide the freedom to experiment and create. We help you drive discussion about the implications of emerging technology on the future of your industry and create an ongoing dialogue about thinking differently.')}
          {contentGenerator('#1a3445','#c4d4e0','workshop', 'From blockchain to AI, haptics, ambient computing and more, our refreshing learning experiences are designed to engage attendees with challenging educational projects that get them deeply immersed in a range of emerging technologies.')}

          {contentGenerator('#1a3445','#E9C77B','', 'We explore unrealised needs and behaviors, and use our insight to dive deep into problems. We develop innovation strategies to create unprecedented opportunities. We then build prototypes to validate our learnings and iterate.', true)}
          {contentGenerator('#1a3445','#E9C77B','discover', 'We identify and develop new opportunities for business innovation using analytics and immersion research. We study your industry and your user through trends, human factors research, attribute mapping, and cultural validation, etc.')}
          {contentGenerator('#1a3445','#E9C77B','strategize', 'With a deeper understanding of the problem, we conduct sprints to diagnose problems, set guiding policies, and plan coherent actions. We craft strategies and deliver clear and actionable guidance to our client partners to achieve big leaps forward.')}
          {contentGenerator('#1a3445','#E9C77B','prototype', 'We love to build stuff. This is when our engineers and designers convene to conduct rapid prototyping. We build experience prototypes to validate, appearance prototypes to iterate, and PoC prototypes to understand human interaction by making powerful, complex systems elegant, simple, and compelling.')}

          {contentGenerator('white','#E2B49A','', 'We construct functional prototypes while testing in an agile cycle. In this phase, we also create a production ready prototype that can scale to serve millions of your customers. We then guide you to successful commercialization.',true)}


          <section className={'panel'} style={{position:'relative', height: '100vh',color:'white', background:'#E2B49A'}}>
              <div className="mainpage container">
                  <div className="row">
                  <div className="four columns">
                    <h1 style={{color:'white'}}>design</h1>
                  </div>
                  <div className="eight columns content-holder">
                    <div>
                      <h5>We apply design-thinking to everything from products to services to information to create systems and human experiences that underpin modern business and life.
                      </h5>
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
          <section className={'panel'} style={{position:'relative', height: '100vh',color:'white', background:'#E2B49A'}}>
              <div className="mainpage container">
                  <div className="row">
                  <div className="four columns">
                    <h1 style={{color:'white'}}>develop</h1>
                  </div>
                  <div className="eight columns content-holder">
                    <div>
                      <h5>We apply extreme-programming and use an rapid, iterative approach to building products for physical and digital mediums.</h5>
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

          <section className={'panel'} style={{position:'relative', height: '100vh',color:'white', background:'#E2B49A'}}>
              <div className="mainpage container">
                  <div className="row">
                  <div className="four columns">
                    <h1 style={{color:'white'}}>engineer</h1>
                  </div>
                  <div className="eight columns content-holder">
                  <div>
                      <h5>We apply extreme-programming and use an rapid, iterative approach to building products for physical and digital mediums.</h5>
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
          <section className={'panel'} style={{position:'relative', height: '100vh',color:'white', background:'#E2B49A'}}>
              <div className="mainpage container">
                  <div className="row">
                  <div className="four columns">
                    <h1 style={{color:'white'}}>productize</h1>
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


        </div>
        {/*** Dynamic content without moving ***/}
        <div ref={(ref) => this.indicator = ref}  style={{display:'flex',position:'fixed', top: '0',height:'100vh',width:'100%', alignItems:'center'}}>
            <div style={{width:'100%', maxWidth: '1200px', margin:'auto'}}>
                <ReactCSSTransitionGroup transitionName="process-title" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                  {titleGenerator()} 
                </ReactCSSTransitionGroup>
            </div>
        </div>
        </div>

      </div>
    );
  }
}

Process.propTypes = {};

