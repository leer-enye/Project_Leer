import { NAME } from './constants';

export const getSession = state => state[NAME].session;

export const getUser = state => state[NAME].user;

export const getUserLoadingStatus = state => state[NAME].loading;

export const getUserUpdateErrors = state => state[NAME].errors;
