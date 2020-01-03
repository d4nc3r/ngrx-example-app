import { TodoEntity } from '../reducers/list.reducer';
import { createAction, props } from '@ngrx/store';
let tempId = 0;

export const loadItems = createAction(
  '[todo] load todo items'
);

export const loadItemsSucceeded = createAction(
  '[todo] succesfully loaded items',
  props<{ payload: TodoEntity[] }>()
);

export const loadItemsFailure = createAction(
  '[todo] failed to load items',
  props<{ message: string }>()
);

export const addListItem = createAction(
  '[todo] add list item',
  ({ description }: { description: string }) => ({
    payload: {
      id: 'T' + tempId++,
      description,
      completed: false
    }
  })
);

export const addListItemSucceeded = createAction(
  '[todo] successfully added list item',
  props<{ oldId: string; payload: TodoEntity }>()
);

export const removeListItem = createAction(
  '[todo] remove list item',
  props<{ payload: TodoEntity }>()
);
