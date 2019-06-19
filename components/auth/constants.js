export const FETCH_USER_URL = 'http://localhost:5000/api/users/users/';

export const NAME = 'auth';

const BASE_URL = process.env.NODE_ENV === 'production' ?
    'https://leer.tosinamuda.com' : 'http://localhost:5000';

export const UPDATE_USER_URL = `${BASE_URL}/api/users/`;
