import { RootState } from "./store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getWeightClasses = createAsyncThunk(
  "fighters/getWwightClasses",
  async () => {
    const res = await axios.get("http://localhost:8000/weightclasses");
    return res.data;
  }
);

export const getFightersByWeightClass = createAsyncThunk(
  "fighters/getFightersByWeightClass",
  async (id: string) => {
    const { data } = await axios.get(
      "http://localhost:8000/fighters/?weightclass=" + id
    );
    return data;
  }
);

interface weightclass {
  name: string;
  id: number;
}

export interface fighter {
  id: number;
  name: string;
  weightclass: string;
  record: string;
  champion: boolean;
  ranking: number;
  pic: string;
}

interface IState {
  weightClasses: weightclass[];
  currentWeightClass: weightclass;
  currentFighterGroup: fighter[];
}

const initialState: IState = {
  weightClasses: [],
  currentWeightClass: { id: 0, name: "" },
  currentFighterGroup: [],
};

export const fighterSlice = createSlice({
  name: "fighterSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeightClasses.fulfilled, (state, { payload }) => {
        state.weightClasses = payload;
      })
      .addCase(getFightersByWeightClass.fulfilled, (state, { payload }) => {
        state.currentFighterGroup = payload;
      });
  },
});
export const allWeightClasses = (state: RootState) => state.fR.weightClasses;
export const currentFighterGroup = (state: RootState) =>
  state.fR.currentFighterGroup;
// exporting reducer from fighterSlice
export default fighterSlice.reducer;
