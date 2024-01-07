import { blogsReducer } from "./reducers/blogs.reducer";
import { userReducer } from "./reducers/user.reducer";

export interface AppState {
  user: any;
  blogs: any;
}

export const reducers = {
  user: userReducer,
  blogs: blogsReducer
};


