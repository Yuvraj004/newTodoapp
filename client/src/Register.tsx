import React from 'react'; import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './index.css';
import prod from './assets/prod2.png';
const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  let navigate = useNavigate();

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send registration data to the backend
    // Implement the API call here
    let response = await fetch('http://localhost:8888/.netlify/functions/api/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({name,email, password}) // body data type must match "Content-Type" header
    })
    let data = await response.json();
    console.log(data);
    if(data!= null){
      alert("Register success");
      navigate('/login');
    }
    else{
      alert("Registration faild,Try again");
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className= 'd-flex flex-row align-items-center justify-content-evenly w-100 vh-100' id="Register">
      <div className="d-flex flex-column align-items-center justify-content-center " id='registerImgBackground'>
        <img src={prod} width={300} height={300}></img>
      </div>
      <div className='d-flex flex-column justify-content-evenly align-items-center' id="Details">
      <h1 className="text-start">Register Yourself <p>For Your Productivity</p></h1>
      <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center '>
        <input className='mb-2 form-control'
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <input className='mb-2 form-control'
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input className='mb-2 form-control'
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className='btn btn-primary' type="submit">Register</button>
      </form>
      </div>
    </div>
  );
};

export default Register;
