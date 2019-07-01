import axios from 'axios';
import CONSTANTS from '../constants/CONSTANTS';

export const loginService = async (email, password) => {
    /*let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };*/
    const res = await axios.post(CONSTANTS.API_URL + `/login`, {
        email: email,
        password: password
    });
    
    return await res;
};
