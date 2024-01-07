import { createAction, props } from '@ngrx/store';

export const setBlogs = createAction('[Blogs] Set Blogs', props<{ blogs: any }>());
