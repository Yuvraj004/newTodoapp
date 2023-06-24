import React, { useState } from 'react';
import SideMenu from '../SideMenu';
import { useNavigate } from 'react-router-dom';
const CreateTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication failed');

      const response = await fetch('http://localhost:4000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      const data = await response.json();
      const { newTodo } = data;
      console.log(newTodo); // Handle the newly created todo as needed

      // Reset form fields
      setTitle('');
      setDescription('');
      navigate('/todos');
    } catch (error) {
      console.error(error);
      // Handle error cases
    }
  };

  return (
    <div className="d-flex vh-100">
      <div className="align-items-center vh-100  p-2 border rounded" style={{ backgroundColor: '#ebebeb', width: '20%', marginLeft: '10px' }}>
        <SideMenu />
      </div>
      <div className="d-flex flex-column align-items-center m-3 w-100">
      <h2>Create Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
      </div>
    </div>
  );
};

export default CreateTodo;
