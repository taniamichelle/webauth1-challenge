import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialUser = {
    user: ""
};

const ColorList = ({ users, updateUsers, history }) => {
    //console.log(users);
    const [editing, setEditing] = useState(false);
    const [userToEdit, setUserToEdit] = useState(initialUser);

    const editUser = user => {
        setEditing(true);
        setUserToEdit(user);
    };

    // 'save' submit handler
    const saveEdit = e => {
        e.preventDefault();
        axiosWithAuth()
            // Make a put request to save your updated user
            .put(`http://localhost:5000/api/users/${userToEdit.id}`, userToEdit)
            .then(res => {
                console.log('updated user data', res);
                updateUsers(users.map(user => {
                    if (userToEdit.id === user.id) {
                        return userToEdit
                    }
                    return user;
                }))
                setEditing(true)
            })
            .catch(err => console.log(err.response));
    };

    const deleteUser = user => {
        axiosWithAuth()
            // make a delete request to delete this user
            .delete(`http://localhost:5000/api/users/${user.id}`, user)
            .then(res => {
                console.log(res);
                updateUsers(users.filter(user => {
                    if (user.id !== user.id) {
                        return user.id;
                    };
                }))
                // history.push('/users');
            })
            .catch(err => console.log(err.response));
    };

    return (
        <div className="users-wrap">
            <p>users</p>
            <ul>
                {users.map(user => (
                    <li key={user.user} onClick={() => editUser(user)}>
                        <span>
                            <span className="delete" onClick={() => deleteUser(user)}>
                                x
            </span>{" "}
                            {user.user}
                        </span>
                    </li>
                ))}
            </ul>
            {editing && (
                <form onSubmit={saveEdit}>
                    <legend>Edit User</legend>
                    <label>
                        User Name:
          <input
                            onChange={e =>
                                setUserToEdit({ ...userToEdit, user: e.target.value })
                            }
                            value={userToEdit.user}
                        />
                    </label>
                    {/* <label>
                        hex code:
          <input
                            onChange={e =>
                                setColorToEdit({
                                    ...colorToEdit,
                                    code: { hex: e.target.value }
                                })
                            }
                            value={colorToEdit.code.hex}
                        />
                    </label> */}
                    <div className="button-row">
                        <button type="submit">save</button>
                        <button onClick={() => setEditing(false)}>cancel</button>
                    </div>
                </form>
            )}
            <div className="spacer" />
        </div>
    );
};

export default UserList;
