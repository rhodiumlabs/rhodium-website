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
        nameAPI: 'Ari',
        title: 'Co-Founder + Managing Partner',
        knowledge: 'Blockchain, Medical Technology, Artificial Intelligence, etc.',

      }, {
        name: 'Imran Jameel',
        nameAPI: 'Imran',
        title: 'Co-Founder + Partner',
        knowledge: ' IoT, Robotics, Consumer Electronics, etc.',

      }, {
        name: 'Alexandra Lutchman',
        nameAPI: 'Alexandra',
        title: 'Co-Founder + Partner',
        knowledge: 'Education, Non-Profits, Civic Works, etc.',

      }, {
        name: 'Alex Daskalov',
        nameAPI: 'Daskalov',
        title: 'Co-Founder + Partner',
        knowledge: ' Blockchain, Medical Technology, Wearables, etc.',

      }, {
        name: 'Nadim Islam',
        nameAPI: 'Nadim',
        title: 'Co-Founder + Partner',
        knowledge: 'Full Stack Developer, Data Visualization, UI/UX, etc.',

      }];
    this.state = {health:{}};
  }

  componentDidMount() {
    const urlHealth = 'https://pebble-health-server.herokuapp.com/webhook';
    fetch(urlHealth, {
      method: 'post',
    }).then((response) => {
      console.log('Success: ' +response);
      response
      .json()
      .then(msg => {this.setState({health:msg})})
    });
  }

  render() {
    return (
      <div className="mainpage container">
        <div className="row" >
          <div className="twelve columns">
            <h1>people</h1>
            <div className="people">
              {this.peoples.map((people,i) =>
                (i!==1) ? <div className="person">
                  <ProfileHead
                    pos={i}
                    key={i}
                    healthapi={this.state.health[people.nameAPI]}
                    people={people}
                    last={(i+1) % 5 == 0 }
                    image={(i < 5)} />
                </div> : null)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

People.propTypes = {};
