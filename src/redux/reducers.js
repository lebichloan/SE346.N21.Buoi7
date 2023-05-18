import { createSlice } from '@reduxjs/toolkit';

export const { addTodo, updateTodo, selectTodo } = todosSlice.actions;
  
const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        selectedTodo: null,
    },
    reducers: {
        addTodo: (state, action) => {
            const { id, title, date, description, done } = action.payload;
            state.todos.push({ id, title, date, description, done });
        },
        updateTodo: (state, action) => {
            const { id, title, date, description, done } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
            todo.title = title;
            todo.date = date;
            todo.done = done;
            todo.description = description;
            }
        },
        selectTodo: (state, action) => {
            const todoId = action.payload;
            if (todoId === null) {
              state.selectedTodo = null;
            } else {
              state.selectedTodo = state.todos.find(todo => todo.id === todoId);
            }
        },
    },
});

export default todosSlice.reducer;