import mapKeys from 'lodash/mapKeys';
import {RECEIVE_CART, FETCH_USER} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CART:
      const cart = action.cart;
      return cart;
case FETCH_USER:
      return action.payload.cart;
      
    default:
      return state;
  }
}
