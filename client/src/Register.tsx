import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  let navigate = useNavigate();

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send registration data to the backend
    // Implement the API call here
    let response = await fetch('http://localhost:4000/register', {
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
    <div className= 'Register' style={{display:"flex"}}>
      <div className='registerImgBackground'>
        <img></img>
      </div>
      <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Register</button>
      </form>
      </div>
    </div>
  );
};

export default Register;
