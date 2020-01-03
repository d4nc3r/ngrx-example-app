import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromList from './list.reducer';

export const featureName = 'todoFeature';

export interface TodoState {
  list: fromList.ListState;
}

export const reducers: ActionReducerMap<TodoState> = {
  list: fromList.reducer
};

// Selectors

// 1. Feature Selector
const selectTodoFeature = createFeatureSelector<TodoState>(featureName);

// 2. Branch Selectors
const selectListBranch = createSelector(selectTodoFeature, f => f.list);

// 3. Helpers
const { selectAll: selectArrayOfTodos } = fromList.adapter.getSelectors(selectListBranch);

// 4. Stuff for Components
export const selectAllTodos = selectArrayOfTodos;
