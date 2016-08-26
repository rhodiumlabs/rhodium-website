import * as types from '../constants/ActionTypes'

export function toggleMenu() {
  return {type: types.TOGGLE_MENU};
}
export function closeMenu() {
  return {type: types.CLOSE_MENU};
}