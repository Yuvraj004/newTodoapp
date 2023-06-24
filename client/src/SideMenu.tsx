import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu: React.FC = () => {
  return (
    <div className="d-flex flex-column w-100 " style={{padding:"1px"}}>
      <p>Tasks</p>
      <ul className="list-group " >
        <li className="list-group-item w-100" style={{backgroundColor:"#ebebeb"}}>
          <a href="#home" className="text">Home</a>
        </li>
        <li className="list-group-item w-100" style={{backgroundColor:"#ebebeb"}}>
          <a href="#"><Link to='/createTodos'>Create Todos</Link></a>
          
          
        </li>
        <li className="list-group-item w-100" style={{backgroundColor:"#ebebeb"}}>
          <a href="#services">Services</a>
        </li>
        <li className="list-group-item w-100"  style={{backgroundColor:"#ebebeb"}}>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
