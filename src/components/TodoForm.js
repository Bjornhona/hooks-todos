/* eslint-disable */

import React, { useState, useEffect, useContext } from 'react';
import TodosContext from '../context';

function TodoForm() {
  const [todo, setTodo] = useState('');
  const { state: { currentTodo = {} }, dispatch } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo("");
    }
  }, [currentTodo.id]);

  const handleSubmit = event => {
    event.preventDefault();
    if (currentTodo.text) {
      dispatch({ type: "UPDATE_TODO", payload: todo });
    } else {
      dispatch({ type: "ADD_TODO", payload: todo });
    }
    setTodo('');
  };

  return (
    <>
      <h1 className="text-2xl font-bold mt-12">Add a Todo</h1>
      <form className="flex justify-center p-5" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          className="border-gray-600 border p-2 bg-gray-200"
          onChange={event => setTodo(event.target.value)}
        />
      </form>
    </>
  )
}

export default TodoForm;