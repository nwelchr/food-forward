import {
  RECEIVE_NONPROFIT_ITEMS,
  RECEIVE_NONPROFIT_ITEM,
  DELETE_NONPROFIT_ITEM
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_NONPROFIT_ITEMS:
      return action.payload;
    case RECEIVE_NONPROFIT_ITEM:
      const item = action.payload;
      return { ...state, [item._id]: item };
    case DELETE_NONPROFIT_ITEM:
      const deleteItem = action.payload;
      const newState = { ...state };
      delete newState[deleteItem._id];
      return newState;
    default:
      return state;
  }
}
