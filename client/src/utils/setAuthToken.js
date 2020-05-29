import axios from 'axios';

//deletes the token header from axios in case there is no token
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    }
    else {
        delete axios.defaults.headers.common['authorization'];
    }
}

export default setAuthToken;