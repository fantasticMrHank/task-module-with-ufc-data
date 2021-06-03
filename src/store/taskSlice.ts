import { RootState } from "./store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTaskTypes = createAsyncThunk(
  "tasks/getAllTaskTypes",
  async () => {
    const res = await axios.get("http://localhost:8000/taskTypes");
    return res.data;
  }
);

export const addNewTask = createAsyncThunk(
  "tasks/addNewTask",
  async (obj: any) => {
    const res = await axios.post("http://localhost:8000/tasks", obj);
    return res.data;
  }
);

export const deleteTaskById = createAsyncThunk(
  "deleteTaskById",
  async (id: string, { dispatch }) => {
    const res = await axios
      .delete("http://localhost:8000/tasks/" + id)
      .then((res) => {
        dispatch(removeTaskLocally(id));
      });
  }
);

export const getTaskListByType = createAsyncThunk(
  "tasks/getTaskListByType",
  async (name: string, thunkAPI) => {
    const res = await axios.get("http://localhost:8000/tasks?type=" + name);
    return res.data;
  }
);
type taskState = {
  // property definition
  currentTaskType: {
    id: number;
    name: string;
  };
  currentTaskList: {
    id: number;
    type: string;
    title: string;
    priority: string;
    due: string;
  }[];

  taskListForDeletion: {
    id: number;
    type: string;
    title: string;
    priority: string;
    due: string;
  }[];

  taskTypes: {
    id: number;
    name: string;
  }[];
  showModal: boolean;
};

const initialState: taskState = {
  // initial values
  currentTaskList: [],
  taskListForDeletion: [],
  currentTaskType: {
    id: 0,
    name: "",
  },
  taskTypes: [],
  showModal: false,
};
export const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    updateTaskType: (state, { payload }) => {
      state.currentTaskType = payload;
    },
    removeTaskLocally: (state, { payload }) => {
      state.taskListForDeletion = state.taskListForDeletion.filter(
        (t) => t.id !== parseInt(payload)
      );

      state.currentTaskList = state.currentTaskList.filter(
        (t) => t.id !== parseInt(payload)
      );
    },
    AddAllTaskForDeletion: (state) => {
      state.taskListForDeletion = state.currentTaskList;
    },
    RemoveAllTaskForDeletion: (state) => {
      state.taskListForDeletion = [];
    },

    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
    addToDeleteList: (state, { payload }) => {
      state.taskListForDeletion.push(payload);
    },
    removeFromDeleteList: (state, { payload }) => {
      state.taskListForDeletion = state.taskListForDeletion.filter(
        (t) => t.id !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskTypes.fulfilled, (state, { payload }) => {
        state.taskTypes = payload;
        state.currentTaskType = state.taskTypes[0];
      })
      .addCase(getTaskListByType.fulfilled, (state, { payload }) => {
        state.currentTaskList = payload;
      })
      .addCase(addNewTask.fulfilled, (state, { payload }) => {
        if (payload.type === state.currentTaskType.name) {
          state.currentTaskList.push(payload);
        }
        state.showModal = false;
      })
      .addCase(deleteTaskById.fulfilled, (state, { payload }) => {});
  },
});

export const allTaskTypes = (state: RootState) => state.tR.taskTypes;
export const {
  updateTaskType,
  toggleModal,
  addToDeleteList,
  removeFromDeleteList,
  AddAllTaskForDeletion,
  RemoveAllTaskForDeletion,
  removeTaskLocally,
} = taskSlice.actions;
export const showModal = (state: RootState) => state.tR.showModal;
export const currentTaskType = (state: RootState) => state.tR.currentTaskType;
export const currentTaskList = (state: RootState) => state.tR.currentTaskList;
export const taskListForDeletion = (state: RootState) =>
  state.tR.taskListForDeletion;
export default taskSlice.reducer;
