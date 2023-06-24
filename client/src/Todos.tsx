import React, { useEffect, useState } from 'react';

interface Todo {
  id: number;
  title: string;
}

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Fetch todos from the backend
    // Implement the API call here
    
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
