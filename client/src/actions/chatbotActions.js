

export function writeMessage(message, init=false) {

 return dispatch => {

  let myInit = { 
      method: 'GET',
      headers: {"Authorization": "Bearer 55e0b7af149a47a7b0646ad5c264cba4"}
  };

  if(init) {
    dispatch(initialize());
  }
  else {
    dispatch(addMessage(message, true)); // Show a loading spinner
  }
  fetch(`https://api.api.ai/api/query?v=20150910&query=${message}&lang=en&sessionId=fdbc5e78-b205-4a82-8520-6e943d1cb6ac&timezone=America/Montreal`,
     myInit)
  .then((response) => {
    response
    .json()
    .then(msg => {dispatch(botReply(msg.result.fulfillment.speech)); console.log(msg)})
   });
 };
}

export function initialize() {
  return {
    type: 'INITIALIZE'
  }
} 

function addMessage(message) {
  return {
    type: 'USER_REPLY',
    message: message
  }
} 

function botReply(message) {
  return {
    type: 'BOT_REPLY',
    message: message
  }
} 

