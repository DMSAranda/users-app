/* eslint-disable no-useless-catch */
import axios from "axios";

export const loginUser = async({username, password}) => {
    
    try {
        return await axios.post(`${import.meta.env.VITE_API_BACKEND}/login`, {username, password});
        //return await axios.post("http://localhost:8080/login", {username, password});
        
    } catch (error) {
        throw error;
    }
}