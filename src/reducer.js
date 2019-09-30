function reducer(state, action) {
  switch(action.type) {
    case "GET_TODOS":
      return { ...state, todos: action.payload };

    case "TOGGLE_TODO":
      const toggledTodos = state.todos.map(t => t.id === action.payload.id ? action.payload : t );
      return { ...state, todos: toggledTodos};
    
    case "REMOVE_TODO":
      const filteredTodos = state.todos.filter(t => t.id !== action.payload.id);
      const isRemovedTodo = state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
      return { ...state, todos: filteredTodos, currentTodo: isRemovedTodo};

    case "ADD_TODO":
      // if (!action.payload) {
      //   return state;
      // }
      // if (state.todos.findIndex(t => t.text === action.payload) > -1) {
      //   return state;
      // }
      const addedTodos = [...state.todos, action.payload];
      return { ...state, todos: addedTodos};

    case "SET_CURRENT_TODO":
      return { ...state, currentTodo: action.payload };

    case "UPDATE_TODO":
      const updatedTodo = { ...action.payload };
      const updatedTodoIndex = state.todos.findIndex(
        t => t.id === state.currentTodo.id
      );
      if (updatedTodo.text) {
        const updatedTodos = [
          ...state.todos.slice(0, updatedTodoIndex),
          updatedTodo,
          ...state.todos.slice(updatedTodoIndex + 1)
        ];
        return {
          ...state,
          currentTodo: {},
          todos: updatedTodos
        }
      } else {
        return state;
      }

    default:
      return state;
  }
}

export default reducer;