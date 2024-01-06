import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/uer.actions';

export const userReducer = createReducer(
  null,
  on(UserActions.setUser, (state, { user }) => user)
);

