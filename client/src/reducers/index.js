import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import cartReducer from "./cartReducer";
import nonprofitItemsReducer from './nonprofitItemsReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  nonprofits: nonprofitItemsReducer,
  cart: cartReducer
});
