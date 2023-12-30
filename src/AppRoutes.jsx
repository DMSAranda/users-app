import { LoginPage } from "./auth/pages/LoginPage"
import { Navigate, Route, Routes } from "react-router-dom"
import { UserRoutes } from "./routes/UserRoutes"
import { useAuth } from "./auth/hooks/useAuth"

export const AppRoutes = () => {

    const { login, isLoginLoading } = useAuth();

    if(isLoginLoading) {
      return(
        <div className="container my-4">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
      )
    }

    return (
        <Routes>
            {
             login.isAuth 
               ? 
                 (<>                     
                      <Route path="/*" element= { <UserRoutes/> } />
                 </>) 
               : 
               <>
                 <Route path="/login" element= { <LoginPage /> } />
                 <Route path="/*" element= { <Navigate to="/login"/> } />
               </>             
            }       
        </Routes>
    )
}