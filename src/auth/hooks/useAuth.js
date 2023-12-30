/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import Swal from "sweetalert2"
import { loginUser } from "../services/authService"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { onLogin, onLogout, onInitLogin } from "../../store/slices/auth/authSlice"

export const useAuth = () => {

    //const [login, dispatch] = useReducer(loginReducer, initialLogin)  
    const dispatch = useDispatch();

    const {user, isAdmin, isAuth} = useSelector(state => state.auth)
    const navigate = useNavigate();  

    const handlerLogin = async({username, password}) => {

        try {
            dispatch(
                onInitLogin()
            );
            const response = await loginUser({ username, password });
            const token = response.data.token;
            const claims = JSON.parse(window.atob(token.split(".")[1]));
            //console.log(claims);
            const user = { username: claims.sub }
            dispatch(
                onLogin({user, isAdmin: claims.isAdmin})
            );
                
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                user,
            }));
            sessionStorage.setItem('token', `Bearer ${token}`);
            navigate('/users');
        }
        catch (error) {
            
            if(error.response?.status == 401){
                    Swal.fire('Error', 'Invalid credentials!', 'error')   
                    dispatch(
                        onLogout()
                    )  
            }else if(error.response?.status == 403){ 
                    Swal.fire('Error', 'No permission!', 'error')  
                    dispatch(
                        onLogout()
                    )    
            }else{
                dispatch(
                    onLogout()
                )
                throw error; 
            }
        }
                    
            
    }   

    const handlerLogout = () => {
       
        dispatch(
            onLogout()
        );
        sessionStorage.removeItem('login'); 
        sessionStorage.removeItem('token');
        sessionStorage.clear;      
    }

    return {
        login: {   user,
                   isAdmin,
                   isAuth
               },
        handlerLogin,
        handlerLogout
    }
}