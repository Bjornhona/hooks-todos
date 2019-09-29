import React, { useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import TodosContext from './context';
import reducer from './reducer';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

// export const UserContext = createContext();   // "Provider" saves a constant value to be passed as props through the entire app as a "Consumer". Dont forget to export and import this created Context variable.
// const userName = "Dave";

const AppComponent = () => {
    const initialState = useContext(TodosContext);
    const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  )
}

ReactDOM.render(
  // <UserContext.Provider value={userName}>
    <AppComponent />
  // </UserContext.Provider>
, document.getElementById('root'));

serviceWorker.unregister();
