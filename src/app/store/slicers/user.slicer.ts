import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { GenericAction } from "..";
import { User } from "../../models";

interface UserReducerState {
  user: User;
}

export const userSlice = createSlice<
  UserReducerState,
  SliceCaseReducers<UserReducerState>,
  string
>({
  name: "user",
  initialState: {} as UserReducerState,
  reducers: {
    setUserState: (state, action: GenericAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserState } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
