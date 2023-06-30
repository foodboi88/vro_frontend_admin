import { combineReducers } from "@reduxjs/toolkit";
import { combineEpics } from "redux-observable";
import {
    AppEpics,
    appReducer,
    BoostrapEpics,
    bootstrapReducer,
  
} from "./controller";
import { LoginEpics, loginReducer } from "./controller/login.slice";

const rootReducer = combineReducers({
    app: appReducer,
    bootstrap: bootstrapReducer,
    login: loginReducer,
});

export const rootEpic = combineEpics(
    ...BoostrapEpics,
    ...LoginEpics,
    ...AppEpics,
);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
