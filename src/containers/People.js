import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProfileHead from '../components/ProfileHead';

export default class People extends Component {
  constructor(props) {
    super(props);
    this.peoples = [{
        name: 'Ari Ramdial',
        title: 'Co-Founder + Managing Partner',
        knowledge: 'Blockchain, Medical Technology, Artificial Intelligence, etc.'
      }, {
        name: 'Imran Jameel',
        title: 'Co-Founder + Partner',
        knowledge: ' IoT, Robotics, Consumer Electronics, etc.'
      }, {
        name: 'Alexandra Lutchman',
        title: 'Co-Founder + Partner',
        knowledge: 'Education, Non-Profits, Civic Works, etc.'
      }, {
        name: 'Alex Daskalov',
        title: 'Co-Founder + Partner',
        knowledge: ' Blockchain, Medical Technology, Wearables, etc.'
      }, {
        name: 'Nadim Islam',
        title: 'Co-Founder + Partner',
        knowledge: 'Full Stack Developer, Data Visualization, UI/UX, etc.'
      }, {
        name: 'Miti Bhavsar',
        title: 'Associate',
        knowledge:'education, finance, block chain, etc.'
      }, {
        name: 'Ayvi Islam',
        knowledge: 'Product Design, Mechanical Engineering, etc.'
      }, {
        name: 'Colin Gallacher',
        knowledge: 'Robotics, Augmented Reality, Haptics, etc.'
      }, {
        name: 'Zafarali Ahmed',
        knowledge: 'Biosimulation, Cancer Genomics, Machine Learning, etc.'
      }, {
        name: 'Anjali Chandrashekar',
        knowledge: 'Product Design'
      }, {
        name: 'Mohammad Rafsan',
        knowledge: 'Distributed Computing'
    }];
    this.state = { pos: 1 };
  }

  render() {
    return (
      <div className="mainpage container">
        <div className="row" >
          <div className="twelve columns">
            <h1>people</h1>
            <div className="people">
              {this.peoples.map((people,i) =>
                <div className="person">
                  <ProfileHead
                    pos={i}
                    people={people}
                    last={(i+1)%5 == 0 }
                    image={(i < 5)} />
                </div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

People.propTypes = {};
