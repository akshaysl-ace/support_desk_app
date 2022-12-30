import axios from 'axios';
import { API_URL_USER, LOGIN_URL_USER } from '../../app/constants';

const signUpUrl = API_URL_USER;
const signInUrl = LOGIN_URL_USER;

// Register a user
const registerTheUser = async user => {
    const response = await axios.post(signUpUrl, user);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

// Log-In the user
const loginTheUser = async user => {
    const response = await axios.post(signInUrl, user);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

// Log the user out
const logOutUser = () => localStorage.removeItem('user');

const authService = {
    registerTheUser,
    loginTheUser,
    logOutUser
}

export default authService;