import { TOGGLE_MENU, CLOSE_MENU } from '../constants/ActionTypes';

const initialState = {
  menuOpened:false
}

export default function global(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_MENU:
      return Object.assign({}, state, {menuOpened: !state.menuOpened});
    case CLOSE_MENU:
      return Object.assign({}, state, {menuOpened: false});
    default:
      return state;
  }
}