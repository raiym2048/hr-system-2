import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

const statusSlice = createSlice({
  name: "auth",
  initialState: {
    item: [],
    status: <boolean>false,
    edit: <boolean>false,
    delete: <boolean>false,
    archive: <boolean>false,
    close: <boolean>false,
  },
  reducers: {
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
    setEdit: (state, action: PayloadAction<boolean>) => {
      state.edit = action.payload;
    },
    setDelete: (state, action: PayloadAction<boolean>) => {
      state.delete = action.payload;
    },
    setArchive: (state, action: PayloadAction<boolean>) => {
      state.archive = action.payload;
    },
    setClose: (state, action: PayloadAction<boolean>) => {
      state.close = action.payload;
    },
  },
});

export const { setStatus, setEdit, setDelete, setArchive, setClose } =
  statusSlice.actions;
export default statusSlice.reducer;
