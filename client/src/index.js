import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore,createStore, applyMiddleware, compose } from '@reduxjs/toolkit' 
import App from './App';
import thunk from 'redux-thunk';
import  {reducer}  from './reducers';
import './index.css'
import { BrowserRouter } from 'react-router-dom';


const store = configureStore({reducer}, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
    <Provider store={store}>
    <App />
    </Provider>,
    
    
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

