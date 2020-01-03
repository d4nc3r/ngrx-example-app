import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as listActions from '../actions/list.actions';

export interface TodoEntity {
  id: string;
  description: string;
  completed: boolean;
}

export interface ListState extends EntityState<TodoEntity> {

}

export const adapter = createEntityAdapter<TodoEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(listActions.addListItem, (state, action) => adapter.addOne(action.payload, state)),
  on(listActions.addListItemSucceeded, (state, action) => {
    const tempState = adapter.removeOne(action.oldId, state);
    return adapter.addOne(action.payload, tempState);
  }),
  on(listActions.removeListItem, (state, action) => adapter.removeOne(action.payload.id, state)),
  on(listActions.loadItemsSucceeded, (state, action) => adapter.addAll(action.payload, state))
);

export function reducer(state: ListState = initialState, action: Action) {
  return reducerFunction(state, action);
}
