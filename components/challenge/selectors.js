import { NAME } from './constants';

export const getOnlineUsers = state => state[NAME].onlineUsers;

export const getCourses = state => state[NAME].courses;

export const getSelectedOpponent = state => state[NAME].selectedOpponent;

export const getSelectedMode = state => state[NAME].selectedMode;

export const getChallengeReqStatus = state => state[NAME].challengeReqStatus;
