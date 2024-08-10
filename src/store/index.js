import { configureStore,  } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import groupReducer from './groupSlice';
import messageReducer from './messageSlice'
const store = configureStore({
  reducer: {
    user: userReducer,
    group: groupReducer,
    messages: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
});

export default store;
