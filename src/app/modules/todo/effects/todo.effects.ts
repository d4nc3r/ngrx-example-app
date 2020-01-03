import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, catchError, filter } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { TodoState } from '../reducers';
import * as listActions from '../actions/list.actions';
import { TodoEntity } from '../reducers/list.reducer';

@Injectable()
export class ListEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<TodoState>
  ) { }

  loadList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.loadItems),
      // filter(action => action.type === '[todo] load todo items'),
      switchMap(() => this.http.get<TodoEntity[]>(environment.todosUrl)
        .pipe(
          map(r => listActions.loadItemsSucceeded({ payload: r })),
          catchError(err => of(listActions.loadItemsFailure({ message: err.message })))
        )
      )
    ), { dispatch: true }
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listActions.addListItem),
      switchMap(a => this.http.post<TodoEntity>(environment.todosUrl, { description: a.payload.description })
        .pipe(
          map(r => listActions.addListItemSucceeded({ oldId: a.payload.id, payload: r }))
        )
      )
    ), { dispatch: true }
  );
}
