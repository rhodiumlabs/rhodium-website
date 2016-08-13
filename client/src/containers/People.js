import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class People extends Component {
  constructor(props) {
    super(props);
    this.peoples = [
          {name: 'Ari Ramdial',
           title: 'Co-Founder + Managing Partner',
           knowledge: 'Blockchain, Medical Technology, Artificial Intelligence, etc.'
          },
          {name: 'Alexandra Lutchman',
           title: 'Co-Founder + Partner',
           knowledge: 'Education, Non-Profits, Civic Works, etc.'
          },
          {name: 'Imran Jameel',
           title: 'Co-Founder + Partner',
           knowledge: ' IoT, Robotics, Consumer Electronics, etc.'
          },
          {name: 'Nadim Islam',
          title: 'Co-Founder + Partner',
          knowledge: 'Full Stack Developer, Data Visualisation, UI/UX'},
          {name: 'Alex Daskalov',
          title: 'Co-Founder + Partner',
          knowledge: ' Data Science, Medical Technology, Wearables, etc.'},

          {name: 'Miti Bhavsar',
          title: 'Associate'},
          {name: 'Ayvi Islam', knowledge: 'Product Design, Mechanical Engineering, etc.'},
          {name: 'Colin Gallacher', knowledge : 'Robotics, Augmented Reality, Haptics, etc. '},
          {name: 'Zafarali Ahmed', knowledge : 'Biosimulation, Cancer Genomics, Machine Learning, etc.'},
          {name: 'Anjali Chandrashekar', knowledge : 'Product Design'},
          {name: 'Mohammad Rafsan', knowledge : 'Distributed Computing'},
    ];
  }
  render() {
    return (
      <div className="flexbox-container mainpage">
        <div className="container">
        <ul>
          {this.peoples.map(people => 
            <li>
              <div className="name">{people.name}</div>

              <div className="knowledge">{people.knowledge}</div>
              <div className="title">{people.title}</div>
            </li>)}
        </ul>
        </div>
      </div>
    );
  }
}

People.propTypes = {};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(People);
