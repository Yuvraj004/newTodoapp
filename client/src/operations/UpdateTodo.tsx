import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface UpdateTodoModalProps {
    todo: any;
    onUpdate : (updatedTodo:any)=>void;
  }

const UpdateTodoModal: React.FC<UpdateTodoModalProps> = ({ todo,onUpdate}) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateTodo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication failed');
      const response = await fetch(`http://localhost:4000/updateTodo/${todo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      const updatedTodo = {
        ...todo,
        title: title,
        description: description,
      };
      onUpdate(updatedTodo);
      console.log('Todo updated successfully');
      handleCloseModal();
    } catch (error) {
      console.error(error);
      // Handle error cases
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleOpenModal}>
        Update Todo
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateTodo}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateTodoModal;
