import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'


const Signup = (props) => {
  let navigate = useNavigate();

  // State for storing email and password
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '' })

  // Function to handle onchange
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  // Function to handle the login button
  const handleSubmit = async (e) => {
    e.preventDefault();
    const{name, email, password} = credentials;

    // API Call
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
    console.log(json);

    // redirectig user based on their login inputs
    if (json.success) {
      // save the authtoke and  redirect user to home page
      localStorage.setItem('token', json.authToken)
      props.showAlert("Account created successfully", 'success');
      navigate('/login');
    }
    else {
      props.showAlert("User name already exists", 'danger');
    }
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" onChange={onChange} required minLength={5} className="form-control" value={credentials.name} id="name" name='name' aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" onChange={onChange} required minLength={5} className="form-control" value={credentials.email} id="email" name='email' aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" onChange={onChange} required minLength={5} className="form-control" value={credentials.password} id="password" name='password' />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
      </div>
    </>
  )
}
Signup.propTypes = {showAlert : PropTypes.func};

export default Signup
