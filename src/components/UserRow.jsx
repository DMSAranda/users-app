import { NavLink } from "react-router-dom"
import { useUsers } from "../hooks/useUsers"
import { useAuth } from "../auth/hooks/useAuth";

export const UserRow = ({id, username, email, admin}) => {

    const {handlerRemoveUser, handlerUserSelected} = useUsers()

    const { login } = useAuth();

    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{email}</td>
            {!login.isAdmin || 
              <>
                <td>
                <button type="button"
                    className="btn btn-primary btn-sm"
                    onClick = { () => handlerUserSelected({
                                                            id, 
                                                            username, 
                                                            email,
                                                            admin
                                                         }) 
                              }>
                    Update
                </button>
                </td>
                <td>
                    <NavLink className={"btn btn-secondary btn-sm"} to={'/edit/' + id}>
                        Update 2
                    </NavLink>
                </td>
                <td>
                    <button type="button"
                        className="btn btn-danger btn-sm"
                        onClick = { () => handlerRemoveUser(id) }>
                        Delete
                    </button>
                </td>
             </>    
            }
            
        </tr>
    )
}