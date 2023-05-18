import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './reducers.js';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;