import { createReducer, on } from '@ngrx/store';
import * as BlogsActions from '../actions/blogs.actions';

export const blogsReducer = createReducer(
  null,
  on(BlogsActions.setBlogs, (state, { blogs }) => blogs)
);

