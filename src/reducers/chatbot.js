
const initialState = {
  loading:true,
  messages: []
}

export default function global(state = initialState, action) {
  switch(action.type) {
    case 'INITIALIZE':
      return Object.assign({}, state, 
        {loading:true,
         messages: []} );
    case 'USER_REPLY':
      return Object.assign({}, state, 
        {loading:true, 
          messages: [...state.messages, {type:'user', message: action.message}]});
    case 'BOT_REPLY':
      return Object.assign({}, state, 
        {loading:false,
         messages: [...state.messages, {type:'bot', 
         message: action.message === "" ? "Sorry I didn't get that." : action.message}]} );
    default:
      return state;
  }
}