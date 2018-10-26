import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import  UserReducer  from '../Reducers/UserReducer';
import  LiveMarket  from '../Reducers/LiveMarket';
import  thunk  from 'redux-thunk';
import  Commodity from '../Reducers/Commodity';
import  Counterparty from '../Reducers/Counterparty'
import  Location  from '../Reducers/Location';
import  SearchReducer from '../Search/SearchReducer'
import  LoginReducer from '../Login/LoginReducer'
import  RegisterReducer from '../Register/RegisterReducer'
import {reducer as formReducer} from 'redux-form'


export default createStore(combineReducers(
    {UserReducer,Commodity,Counterparty,LiveMarket,Location,SearchReducer,LoginReducer,RegisterReducer,form:formReducer} ),
    applyMiddleware( thunk)
);

//applyMiddleware( thunk)