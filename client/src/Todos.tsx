import React, { useEffect, useState } from 'react';
import SideMenu from './SideMenu';
import UpdateTodoModal from './operations/UpdateTodo';
import DeleteTodo from './operations/DeleteTodo';
import { Card } from 'react-bootstrap';

interface Todo {
  _id: number;
  title: string;
  description: string;
}

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const token = localStorage.getItem('token');

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:4000/todos', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }

      const todosData = await response.json();
      setTodos(todosData.todos);
    } catch (error) {
      console.error(error);
    }
  };
  const handleTodoDelete = () => {
    // Fetch todos again after deletion
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleTodoUpdate = (updatedTodo: Todo) => {
    // Find the index of the updated todo
    const updatedIndex = todos.findIndex((todo) => todo._id === updatedTodo._id);

    if (updatedIndex !== -1) {
      // Create a new array with the updated todo
      const updatedTodos = [...todos];
      updatedTodos[updatedIndex] = updatedTodo;

      // Update the todos state with the updated array
      setTodos(updatedTodos);
    }
  };

  return (
    <div className="d-flex vh-100">
      <div className="align-items-center vh-100  p-2 border rounded" style={{ backgroundColor: '#ebebeb', width: '20%', marginLeft: '10px' }}>
        <SideMenu />
      </div>
      <div className="d-flex flex-column align-items-center m-3 w-100">
        <h1 className="text-center">Todos</h1>
        <div className="w-80">
          {todos.length > 0 ? (
            todos.map((todo: Todo) => (
              <Card key={todo._id} className="mb-3">
                <Card.Body>
                  <Card.Title>{todo.title}</Card.Title>
                  <Card.Text>{todo.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <UpdateTodoModal todo={todo} onUpdate={handleTodoUpdate} />
                    <DeleteTodo todoId={todo._id} onDelete={handleTodoDelete} />
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No todos created</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
