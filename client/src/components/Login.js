import React, { useState } from "react";
import axios from 'axios';

const Login = ({ history }) => {
    const [creds, setCreds] = useState({ username: '', password: '' });

    const handleChange = event => {
        setCreds({ ...creds, [event.target.name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // make a post request to retrieve a token from the api
        axios.post('http://localhost:5000/api/login', creds)
            .then(res => {
                console.log(res);
                // save token into localStorage to persist user's login session between refreshes. can now access value of login token from anywhere
                localStorage.setItem('token', res.data.payload);
                // when you have handled the token, navigate to the BubblePage route
                history.push('/colors');
            })
            .catch(err => console.log(err.response));
    };


    return (
        <>
            <h1>Welcome!</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='username'
                    placeholder='username'
                    value={creds.username}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='password'
                    placeholder='password'
                    value={creds.password}
                    onChange={handleChange}
                />
                <button type='submit'>Login</button>
            </form>
        </>
    );
};

export default Login;
