import { userReducer } from "./reducers/user.reducer";

export interface AppState {
  user: any;
  product: any;
}

export const reducers = {
  user: userReducer,
};


