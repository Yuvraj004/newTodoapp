import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import img from './assets/loginimg.png';
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  let navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send login data to the backend
    // Implement the API call here
    let response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({email, password}) // body data type must match "Content-Type" header
    })
    let data = await response.json();
    console.log(data);
    if(data!= null){
      localStorage.setItem('data',data);
      localStorage.setItem('token',data.token);
      alert("Login success");
      navigate('/todos');
    }
    else{
      alert("Login failed,Try again");
      navigate('/login');
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className='d-flex flex-row align-items-center justify-content-evenly w-100 vh-100' id= "Login">
      <div className ='d-flex flex-column align-items-center justify-content-center' id ="registerImgBackground">
      <img src={img} width={300} height={300}></img>
      </div>
      <div className='d-flex flex-column justify-content-center align-items-center' id="Details">
        <h1 className="text-start "><b><u>LOGIN</u></b></h1>
        <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center '>
          <input className='mb-2 form-control'
            type="text"
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
          />
          <input className='mb-2 form-control'
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className='btn btn-primary'  type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
