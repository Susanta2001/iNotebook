import React, { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'

function Login(props) {

    let navigate = useNavigate();
    // Function to handle the login button
    const handleSubmit = async (e) => {
            e.preventDefault();
            
        // API Call
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);

        // redirectig user based on their login inputs
        if(json.success){
            // save the authtoke and  redirect user to home page
            localStorage.setItem('token', json.authToken)
            props.showAlert("Logged in successfully", 'success');
            navigate('/');
        }
        else{
            props.showAlert("Invalid Credentials", 'danger');

        }
    }

    // State for storing email and password
    const [credentials, setCredentials] = useState({email: '', password: ''})

    // Function to handle onchange
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value});
    }

    return (    
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" onChange={onChange} className="form-control" value={credentials.email} id="email" name='email' aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" onChange={onChange} className="form-control" value={credentials.password} id="password" name='password'/>
                    </div>
                    <button type="submit" className="btn btn-primary" >Login</button>
                </form>
            </div>
        </>
    )
}
Login.propTypes = {showAlert : PropTypes.func};

export default Login
