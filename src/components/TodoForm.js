/* eslint-disable */

import React, { useState, useEffect, useContext } from 'react';
import TodosContext from '../context';
import axios from 'axios';
import uuidv4 from 'uuid/v4';

function TodoForm() {
  const [todo, setTodo] = useState('');
  const { state: { todos = [], currentTodo = {} }, dispatch } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo("");
    }
  }, [currentTodo.id]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (currentTodo.text) {
      const response = await axios.patch(`https://hooks-api.asaeri3.now.sh/todos/${currentTodo.id}`, {
        text: todo
      });
      dispatch({ type: "UPDATE_TODO", payload: response.data });
    } else  if (todo) {
      const response = await axios.post('https://hooks-api.asaeri3.now.sh/todos', {
        id: uuidv4(),
        text: todo,
        complete: false
      })
      dispatch({ type: "ADD_TODO", payload: response.data });
    } else {
      return todos;
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