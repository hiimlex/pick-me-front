import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
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
    removeUserState: (state) => {
      state.user = {} as User;
    },
  },
});

export const setUserState: ActionCreatorWithPayload<User, string> = userSlice
  .actions.setUserState as any;

export const removeUserState: ActionCreatorWithoutPayload<any> = userSlice
  .actions.removeUserState as any;

const userReducer = userSlice.reducer;

export default userReducer;
