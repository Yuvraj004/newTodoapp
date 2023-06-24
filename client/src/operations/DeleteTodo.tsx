import React from 'react';
import { Button } from 'react-bootstrap';
interface DeleteTodoProps {
  todoId: number;
  onDelete: () => void;
}

const DeleteTodo: React.FC<DeleteTodoProps> = ({ todoId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Call the onDelete callback to update the todos list
        onDelete();
      } else {
        throw new Error('Failed to delete todo');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={handleDelete}>Delete</Button>
  );
};

export default DeleteTodo;
