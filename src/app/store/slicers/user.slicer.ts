import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { GenericAction } from "..";
import { IUser } from "../../models";

interface UserReducerState {
  user: IUser;
}

export const userSlice = createSlice<
  UserReducerState,
  SliceCaseReducers<UserReducerState>,
  string
>({
  name: "user",
  initialState: {} as UserReducerState,
  reducers: {
    setUserState: (state, action: GenericAction<IUser>) => {
      state.user = action.payload;
    },
    removeUserState: (state) => {
      state.user = {} as IUser;
    },
  },
});

export const setUserState: ActionCreatorWithPayload<IUser, string> = userSlice
  .actions.setUserState as any;

export const removeUserState: ActionCreatorWithoutPayload<any> = userSlice
  .actions.removeUserState as any;

const userReducer = userSlice.reducer;

export default userReducer;
