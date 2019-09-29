import React, { useContext } from 'react';
import TodosContext from '../context';

const TodoList = () => {
  const { state, dispatch } = useContext(TodosContext);
  const title = state.todos.length > 0
    ? `${state.todos.length} Todos`
    : "Nothing To Do!"

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-4xl font-bold m-6">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map(todo => {
          return (
            <div key={todo.id}>
              <li className="flex items-center bg-teal-400 border-black border my-2 py-4">
                <span 
                  className={`flex-1 ml-12 curser-pointer ${todo.complete && "line-through text-gray-600"}`} 
                  onDoubleClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo })}
                >
                  {todo.text}
                </span>
                <button 
                  className="bg-white border-black border rounded p-2 mx-2"
                >
                  <img 
                    src="https://icon.now.sh/edit/0050c5" 
                    alt="Edit Icon" 
                    className="h-6" 
                  />
                </button>
                <button
                  className="bg-white border-black border rounded p-2 mx-2"
                  onClick={() => dispatch({ type: "REMOVE_TODO", payload: todo })}
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