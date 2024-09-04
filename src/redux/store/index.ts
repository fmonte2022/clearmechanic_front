import { configureStore } from "@reduxjs/toolkit";
import { throttle } from "lodash";
import {
    TypedUseSelectorHook,
    useDispatch as _useDispatch,
    useSelector as _useSelector
} from "react-redux";

import appStateSlice from "src/redux/reducers/appStateSlice";
import LocalStorageUtility from 'src/utilities/LocalStorageUtility';

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
  },
});

store.subscribe(
	throttle( () => LocalStorageUtility.saveState(store.getState()), 1000)
);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = _useDispatch;

export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;