/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList"
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/Paginator";

export const UsersPage = () => {

    const page = useParams().page;
  
    const { users,
            visibleForm,
            isLoading,
            paginator,
            handlerOpenForm, 
            getUsers    
          } = useUsers();

    const { login } = useAuth();

    useEffect(()=>{
        getUsers(page);
    }, [page]);      

    if(isLoading){
        return(
            <div className="container my-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    return (
        <>
            {!visibleForm ||
                <UserModalForm />
            }
            <div className="container my-4">
                <h2>Users App</h2>
                <div className="row">

                    <div className="col">
                        {(visibleForm || !login.isAdmin) ||
                            <button
                                className="btn btn-primary my-2"
                                onClick={() => handlerOpenForm()}>
                                New User
                            </button>
                        }
                        {
                            users.length === 0
                                ? <div className="alert alert-warning">Empty List of Users</div>

                                : 
                                <>
                                    <UsersList />
                                    <Paginator url="/users/page" paginator={paginator}/>
                                </>
                                
                        }
                    </div>
                </div>
            </div>
        </>
    )
}