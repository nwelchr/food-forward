import mapKeys from 'lodash/mapKeys';
import { RECEIVE_CART } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CART:
      const cart = action.cart;
      return { cart };
    default:
      return state;
  }
}
