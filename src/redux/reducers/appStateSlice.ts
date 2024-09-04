import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState, UserLoginInfo } from "src/pages/types";
import LocalStorageUtility from "src/utilities/LocalStorageUtility";

const loginLocation =  LocalStorageUtility.loadState();
const { userId, userName, name } = loginLocation?.appState?.auth || {};

const initialState: AppState = {
  section: "",
  auth: userId ? { userId, userName, name } : null,
  lang: "es",
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setSection: (state, action: PayloadAction<string>) => {
      state.section = action.payload;
    },
    setAuthState: (state, action: PayloadAction<UserLoginInfo | null>) => {
      state.auth = action.payload;
    },
    setLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
    cleanState: (state) => {
      state.auth = null;
      state.section = "";
      window.location.reload();
    },
  }
});

export const {  setSection, setAuthState, cleanState, setLang } = appStateSlice.actions;

export default appStateSlice.reducer;