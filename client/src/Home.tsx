import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Home = () => {

  return (
    <div className='d-flex flex-column align-items-center justify-content-center p-5 border rounded w-100'>
      <h1 className='text-center' >
        <b>UNLEASH</b> your <b>PRODUCTIVITY</b>
      </h1>
      <h1 className='text-center ' >and</h1>
      <h1 className='text-center ' >
        <b>IGNITE</b> your <b>MOTIVATION</b>
      </h1>
      <Link to='/login' className='btn btn-warning text-white'>
        START ORGANIZING
      </Link>
    </div>
  );
};

export default Home;
