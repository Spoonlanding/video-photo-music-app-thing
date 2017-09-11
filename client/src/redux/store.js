import { createStore, applyMiddleware } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import reducer from './reducers';

const client = axios.create({
  baseURL:'http://localhost:3000/',
  responseType: 'json'
});

const store = createStore(
  reducer,
  applyMiddleware(axiosMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;