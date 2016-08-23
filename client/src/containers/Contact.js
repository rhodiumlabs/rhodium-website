import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Footer from '../components/Footer';

import ChatLoader from '../components/ChatLoader';
import * as ChatBotActions from '../actions/chatbotActions';
import TrianglifyComponent from '../components/TrianglifyContainer';

import '../utils/api.ai.js';
import Typist from 'react-typist';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let initialMessage = "this is the rhodium chatbot intro text sent on sunday August 14 at 6:26pm";
    this.props.chatbotActions.writeMessage(initialMessage, true);
  }
  handleSubmit(e) {
    e.preventDefault();
    
    this.props.chatbotActions.writeMessage(this.state.userInput);
    this.setState({userInput: ''})
  }
  componentWillUnmount() {
    this.props.chatbotActions.initialize();
  }
  componentDidUpdate() {
     this.messageArea.scrollTop = this.messageArea.scrollHeight + 40;
  }
  render() {
    const { global,chatbot } = this.props;
    return (
      <div className="flexbox-container mainpage">
          <div className="container" >
            <div className="row">
            <div className="twelve columns">
            <div className="chatbot">
              <ul ref={(ref) => this.messageArea = ref} className="message-area">
                <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>

                
                {chatbot.messages.map(m => (
                  <li className={"message " + m.type}>
                    {m.type == 'bot' ? <Typist avgTypingDelay={20} cursor={{hideWhenDone:true}}>{'>_ ' + m.message}</Typist> : m.message}
                  </li>
                  )
                )}
                 {chatbot.loading ? <li className="bot message"><ChatLoader/></li> : ''}
                </ReactCSSTransitionGroup>
              </ul>

              <div className="input">
                <form onSubmit={this.handleSubmit}> 
                  <input type="text" value={this.state.userInput} 
                  onChange={(e) => this.setState({userInput: e.target.value})} 
                  placeholder="Type a message..."  /></form>
              </div>
            </div>
            </div>
            </div>
            <div className="row" style={{marginTop: '4rem'}}>
              <div className="six columns">
                <h4>Address</h4>
                <p>7475 Boul Newman,<br/> Montréal QC H8N 1X3, Canada</p>
              </div>
              <div className="six columns">
                <h4>Say hello!</h4>
                <p>Email us at <a href="mailto:hello@rhodium.io">hello@rhodium.io</a></p>

              </div>
            </div>
          </div>
      </div>
    );
  }
}

Contact.propTypes = {};

function mapStateToProps(state) {
  return {global: state.global, chatbot: state.chatbot};
}

function mapDispatchToProps(dispatch) {
  return {
      chatbotActions: bindActionCreators(ChatBotActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact);
