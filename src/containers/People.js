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
        health: {
          steps: undefined,
          city: undefined
        }
      }, {
        name: 'Imran Jameel',
        nameAPI: 'Imran',
        title: 'Co-Founder + Partner',
        knowledge: ' IoT, Robotics, Consumer Electronics, etc.',
        health: {
          steps: undefined,
          city: undefined
        }
      }, {
        name: 'Alexandra Lutchman',
        nameAPI: 'Alexandra',
        title: 'Co-Founder + Partner',
        knowledge: 'Education, Non-Profits, Civic Works, etc.',
        health: {
          steps: undefined,
          city: undefined
        }
      }, {
        name: 'Alex Daskalov',
        nameAPI: 'Daskalov',
        title: 'Co-Founder + Partner',
        knowledge: ' Blockchain, Medical Technology, Wearables, etc.',
        health: {
          steps: undefined,
          city: undefined
        }
      }, {
        name: 'Nadim Islam',
        nameAPI: 'Nadim',
        title: 'Co-Founder + Partner',
        knowledge: 'Full Stack Developer, Data Visualization, UI/UX, etc.',
        health: {
          steps: undefined,
          city: undefined
        }
      }, {
        name: 'Miti Bhavsar',
        nameAPI: 'Miti',
        title: 'Associate',
        knowledge:'education, finance, block chain, etc.',
        health: {
          steps: undefined,
          city: undefined
        }
      }, {
        name: 'Ayvi Islam',
        nameAPI: 'Ayvi',
        knowledge: 'Product Design, Mechanical Engineering, etc.',
        health: {
          steps: undefined,
          city: undefined
        }
      }, {
        name: 'Colin Gallacher',
        nameAPI: 'Colin',
        knowledge: 'Robotics, Augmented Reality, Haptics, etc.',
        health: {
          steps: undefined,
          city: undefined
        }
      }, {
        name: 'Zafarali Ahmed',
        nameAPI: 'Zafarali',
        knowledge: 'Biosimulation, Cancer Genomics, Machine Learning, etc.',
        health: {
          steps: undefined,
          city: undefined
        }
      }, {
        name: 'Anjali Chandrashekar',
        nameAPI: 'Anjali',
        knowledge: 'Product Design',
        health: {
          steps: undefined,
          city: undefined
        }
      }, {
        name: 'Mohammad Rafsan',
        nameAPI: 'Rafsan',
        knowledge: 'Distributed Computing',
        health: {
          steps: undefined,
          city: undefined
        }
    }];
    this.state = { pos: 1 };
  }

  componentDidMount() {
    const urlHealth = 'https://pebble-health-server.herokuapp.com/webhook';
    fetch(urlHealth, {
      method: 'post',
    }).then((response) => {
      console.log('Success: ' +response);
      // Set us up the state of the people
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
                <div className="person">
                  <ProfileHead
                    pos={i}
                    key={i}
                    people={people}
                    last={(i+1) % 5 == 0 }
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
