import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class People extends Component {
  constructor(props) {
    super(props);
    this.peoples = [
          {name: 'Ari Ramdial',
           title: 'Co-Founder + Managing Partner'},
          {name: 'Alexandra Lutchman',
           title: 'Co-Founder + Partner'},
          {name: 'Imran Jameel',
           title: 'Co-Founder + Partner'},
          {name: 'Nadim Islam',
          title: 'Co-Founder + Partner - Full Stack Developer, Data Visualisation, UI/UX'},
          {name: 'Alex Daskalov',
          title: 'Co-Founder + Partner'},
          {name: 'Miti Bhavsar',
          title: 'Associate'},
          {name: 'Colin Gallacher', title : 'Robotics, Augmented Reality, Haptics, etc. '},
          {name: 'Zafarali Ahmed', title : 'Biosimulation, Cancer Genomics, Machine Learning, etc.'},
          {name: 'Anjali Chandrashekar', title : 'Product Design'},
          {name: 'Mohammad Rafsan', title : 'Distributed Computing'},
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
