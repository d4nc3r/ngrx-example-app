import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoEntity } from './reducers/list.reducer';
import { Store } from '@ngrx/store';
import { TodoState, selectAllTodos } from './reducers';
import * as listActions from './actions/list.actions';

const fakeTodos = [
  { id: '1', description: 'Change kitty litter', completed: false },
  { id: '2', description: 'Go grocery shopping', completed: false },
  { id: '3', description: 'Replace stove light bulb', completed: false },
];

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoList$: Observable<TodoEntity[]>;

  constructor(private store: Store<TodoState>) { }

  ngOnInit() {
    this.todoList$ = this.store.select(selectAllTodos);
  }

  loadList() {
    this.store.dispatch(listActions.loadItems());
  }

  add(item: HTMLInputElement) {
    this.store.dispatch(listActions.addListItem({ description: item.value }));
  }

  remove(itemToRemove: TodoEntity) {
    this.store.dispatch(listActions.removeListItem({ payload: itemToRemove }));
  }

}
