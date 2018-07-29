import axios from 'axios';
import { RECEIVE_NONPROFIT_ITEMS, FETCH_USER, RECEIVE_CART } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user', { withCredentials: true });

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const receiveCart = cart => ({ type: RECEIVE_CART, cart });

export const fetchCart = id => async dispatch => {
  const res = await axios.get(`/api/users/${id}/items`);

  dispatch(receiveCart(res.cart));
};

export const addCartItem = (id, item) => async dispatch => {
  const res = await axios.post(`/api/users/${id}/items`, { item });
  dispatch(receiveCart(res.data));
};

export const updateCartItem = (id, item) => async dispatch => {
  const res = await axios.put(`/api/users/${id}/items/${item._id}`, { item });

  dispatch(receiveCart(res.data));
};

export const deleteCartItem = (id, itemId) => async dispatch => {
  const res = await axios.delete(`/api/users/${id}/items/${itemId}`);

  dispatch(receiveCart(res.data));
};

export const checkout = id => async dispatch => {
  const res = await axios.patch(`/api/users/${id}/pay/`);

  dispatch(receiveCart({}));
};

export const fetchNonprofitItems = id => async dispatch => {
  const res = await axios.get(`/api/nonprofits/${id}/items`);
  console.log(res.data, "RESPONSE")
  dispatch({ type: RECEIVE_NONPROFIT_ITEMS, payload: res.data });
};
