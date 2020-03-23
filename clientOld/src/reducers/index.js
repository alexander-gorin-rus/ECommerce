import { combineReducers } from 'redux';
import alert from './alert';
import admin from './admin';
import consumer from './consumer';
import category from './category';
import product from './product';

export default combineReducers({ alert, admin, consumer, category, product });
