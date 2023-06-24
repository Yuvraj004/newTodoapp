import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Todos from './Todos';
import CreateTodo from './operations/CreateTodos';
import { Navbar, Nav, Button } from 'react-bootstrap';

const CustomNavbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); 
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to the login route
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Navbar.Brand as={Link} to="/todos">
        BRAIN IT DOWN
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/register">
            Register
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
          {isAuthenticated && (
            <Nav.Link as={Link} to="/todos">
              Todos
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
      {isAuthenticated && (
        <Button variant="outline-light" onClick={handleLogout} className="m-2">
          Logout
        </Button>
      )}
    </Navbar>
  );
};

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  useEffect(() => {
    console.log('todos');
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <div>
        <CustomNavbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {isAuthenticated ? (
            <Route path="/todos" element={<Todos />} />
          ) : (
            <Route path="/login" element={<Login />} /> 
          )}
          <Route path="/createTodos" element={<CreateTodo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
