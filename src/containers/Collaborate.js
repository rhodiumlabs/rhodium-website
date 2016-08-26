import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class Collaborate extends Component {
  render() {
    return (
      <div className="mainpage container collaborate">
        <div className="row" >
          <div className="twelve columns">
            <h1>collaborate</h1>
            <h4><b>innovation labs</b></h4>
            <br/>
            <p>Imagine your team controlling a drone with their brain as it 
            flies through the air competing against an AI bot while you 3D printing a VR headset.  
            Attendees don't sit and listen to lectures on why technology matters - they experience it. </p>
          </div>
        </div>
        <div className="row" >
          <div className="three columns">
            <ul>
              <li>Drones </li>
              <li>Robotics</li>
              <li>Internet-of-Things</li>
              <li>Artificial Intelligence </li>
            </ul>
          </div>
          <div className="three columns">
            <ul>
              <li>Blockchain</li>
              <li>Virtual Reality </li>
              <li>Wearables</li>
              <li>3D Printing </li>
            </ul>
          </div>
          <div className="row" >
            <div className="six columns">
             <div className="row collab-images">
                <div className="four columns image" style={{backgroundImage:'url(\'/collaboration/innovation1.jpg\')'}}></div>
                <div className="four columns image" style={{backgroundImage:'url(\'/collaboration/innovation2.jpg\')'}}></div>
                <div className="four columns image" style={{backgroundImage:'url(\'/collaboration/innovation3.jpg\')'}}></div>

             </div>
            </div>
          </div>
        </div>


        <hr/>
        <div className="row" >
          <div className="twelve columns">
            <h4><b>hackathons</b></h4>
            <br/>
            <p>Imagine your coworkers having the freedom to experiment and create,
             all while thinking of future projects. We help you drive discussion 
             about the implications of technology on the future of your industry 
             and create a dialogue about thinking differently.</p>
          </div>
        </div>


        <div className="row" >
                    <div className="three columns">
            <ul>
              <li>Event Design </li>
              <li>Marketing</li>
              <li>Facilitators</li>
              <li>Hardware</li>
            </ul>
          </div>
          <div className="three columns">
            <ul>
              <li>Partnerships Liaison</li>
              <li>Mentors + Judges </li>
              <li>Inventory Mgmt. </li>
              <li>Project Expo </li>
            </ul>
          </div>
          <div className="six columns">
             <div className="row collab-images">

              <div className="four columns image " style={{backgroundImage:'url(\'/collaboration/hackathon1.jpg\')'}}></div>
              <div className="four columns image " style={{backgroundImage:'url(\'/collaboration/hackathon2.jpg\')'}}></div>
              <div className="four columns image " style={{backgroundImage:'url(\'/collaboration/hackathon3.jpg\')'}}></div>
             </div>
          </div>

        </div>
        <hr/>
        <div className="row" >
          <div className="twelve columns">
            <h4><b>investigative learning</b></h4>
            <br/>
            <p>You have the time, and the people - how do you get them to innovate? 
            With curated hands-on experiences, rhodium can help beginners and challenge experts
             on their emerging tech skills. These refreshing learning experiences are 
             designed to engage attendees with educational projects and the right platform. </p>
          </div>
        </div>


        <div className="row" >
          <div className="three columns">
            <ul>
              <li>Workshop Design</li>
              <li>Quick Start Guides</li>
              <li>Education Curators</li>
            </ul>
          </div>
          <div className="three columns">
            <ul>
              <li>Marketing</li>
              <li>Facilitators</li>
              <li>Mentorship</li>
            </ul>
          </div>
          <div className="six columns">
             <div className="row collab-images">
              <div className="four columns image" style={{backgroundImage:'url(\'/collaboration/investigative1.jpg\')'}}></div>
              <div className="four columns image" style={{backgroundImage:'url(\'/collaboration/investigative2.jpg\')'}}></div>
              <div className="four columns image" style={{backgroundImage:'url(\'/collaboration/investigative3.jpg\')'}}></div>
             </div>
          </div>          
        </div>
      </div>
    );
  }
}

Collaborate.propTypes = {};

