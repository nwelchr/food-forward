import axios from 'axios';
import {
  RECEIVE_NONPROFIT_ITEMS,
  RECEIVE_NONPROFIT_ITEM,
  DELETE_NONPROFIT_ITEM
} from './types';

export const fetchNonprofitItems = () => async dispatch => {
  console.log('FETCHING ITEMS...');
  const res = await axios.get(`/api/items`);
  console.log(res.data, 'FETCHED ITEMS!!!');
  dispatch({ type: RECEIVE_NONPROFIT_ITEMS, payload: res.data });
};

export const createNonprofitItem = item => async dispatch => {
  console.log(item, 'CREATING NEW ITEM...');
  const res = await axios.post(`/api/items`, item);
  console.log(res.data, 'NEWLY CREATED ITEM!!!');
  dispatch({ type: RECEIVE_NONPROFIT_ITEM, payload: res.data });
};

export const updateNonprofitItem = item => async dispatch => {
  const res = await axios.put(`/api/items`, item);

  dispatch({ type: RECEIVE_NONPROFIT_ITEM, payload: res.data });
};

export const deleteNonprofitItem = id => async dispatch => {
  const res = await axios.delete(`/api/items/${id}`);

  dispatch({ type: DELETE_NONPROFIT_ITEM, payload: res.data });
};
