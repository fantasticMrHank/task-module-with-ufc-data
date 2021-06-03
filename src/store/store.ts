import { configureStore } from "@reduxjs/toolkit";
import fighterReducer from "./fighterSlice";
import taskReducer from "./taskSlice";

const store = configureStore({
  reducer: {
    fR: fighterReducer,
    tR: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
