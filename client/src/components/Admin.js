import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Admin = props => {
    const [userList, setUserList] = useState([]);
    const getUsers = () => {
        axiosWithAuth()
            .get('http://localhost:5000/api/users')
            .then(res => {
                console.log('Admin data: ', res);
                setUserList(res.data);
            })
            .catch(err => console.log(err.response));
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
        </>
    );
};

export default Admin;