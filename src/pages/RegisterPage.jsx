/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import { UserForm } from "../components/UsersForm"
import { useParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";

export const RegisterPage = () => {

    const { initialUserForm, users = [] } = useUsers();
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const { id } = useParams();

    useEffect( () => {
        if (id){
                const user = users.find( u => u.id == id) || initialUserForm;
                setUserSelected(user);
               }
        }, [id])
              
    return (
        <div className="container my-4">
            <h4>{userSelected.id > 0 ? 'Edit User' : 'Users Register'}</h4>
            <div className="row">
                <div className="col">
                    <UserForm userSelected={userSelected} />
                </div>
            </div>
        </div>
    )
}