import React, { useContext } from 'react';
import TodosContext from '../context';
import axios from 'axios';

const TodoList = () => {
  const { state, dispatch } = useContext(TodosContext);
  const title = state.todos.length > 0
    ? `${state.todos.length} Todos`
    : "Nothing To Do!"

  return (
    <div>
      <h1 className="text-2xl font-bold m-6">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map(todo => {
          return (
            <div key={todo.id}>
              <li className="flex items-center bg-teal-400 border-gray-600 border my-2 py-4">
                <span 
                  className={`flex-1 ml-12 curser-pointer ${todo.complete && "line-through text-gray-600"}`} 
                  onDoubleClick={async() => {
                    const response = await axios.patch(`https://hooks-api.asaeri3.now.sh/todos/${todo.id}`, {
                      complete: !todo.complete
                    });
                    dispatch({ type: "TOGGLE_TODO", payload: response.data })
                  }}
                >
                  {todo.text}
                </span>
                <button 
                  className="bg-white border-gray-600 border rounded p-1 mx-2"
                  onClick={() => dispatch({ type: "SET_CURRENT_TODO", payload: todo})}
                >
                  <img 
                    src="https://icon.now.sh/edit/0050c5" 
                    alt="Edit Icon" 
                    className="h-6" 
                  />
                </button>
                <button
                  className="bg-white border-gray-600 border rounded p-1 mx-2"
                  onClick={async () => {
                    await axios.delete(`https://hooks-api.asaeri3.now.sh/todos/${todo.id}`);
                    dispatch({ type: "REMOVE_TODO", payload: todo });
                  }}
                >
                  <img 
                    src="https://icon.now.sh/delete/8b0000" 
                    alt="Delete Icon" 
                    className="h-6" 
                  />
                </button>
              </li>
            </div>
          )
        })}
      </ul>
    </div>
  )
}

export default TodoList;