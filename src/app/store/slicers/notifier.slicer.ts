import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { GenericAction } from "../";
import { NotifierProps } from "../../../ui/components";

interface NotifierReducerState {
  notifications: NotifierProps[];
  counter: number;
}

export const notifierSlice = createSlice<
  NotifierReducerState,
  SliceCaseReducers<NotifierReducerState>
>({
  name: "notifier",
  initialState: {
    notifications: [],
    counter: 0,
  },
  reducers: {
    createNotification: (
      state,
      action: GenericAction<Omit<NotifierProps, "id">>
    ) => {
      state.notifications.push({ ...action.payload, id: state.counter });
      state.counter++;
    },
    removeNotification: (state, action: GenericAction<number>) => {
      state.notifications = state.notifications.filter(
        (notifier) => notifier.id !== action.payload
      );
    },
  },
});

export const createNotification: ActionCreatorWithPayload<
  Omit<NotifierProps, "id">,
  string
> = notifierSlice.actions.createNotification as any;

export const removeNotification: ActionCreatorWithPayload<number, string> =
  notifierSlice.actions.removeNotification as any;

const notifierReducer = notifierSlice.reducer;

export default notifierReducer;
