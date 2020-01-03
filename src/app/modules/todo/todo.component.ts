import { Component, OnInit } from '@angular/core';

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
  todoList: Todo[] = [];
  itemIndex = 4;

  constructor() { }

  ngOnInit() { }

  loadList() {
    this.todoList = [...fakeTodos];
  }

  add(item: HTMLInputElement) {
    const newItem = {
      id: 'T' + this.itemIndex++,
      description: item.value,
      completed: false
    };
    this.todoList.push(newItem);
  }

  remove(itemToRemove: Todo) {
    const filteredList =
      this.todoList.filter(todo => todo.id !== itemToRemove.id);

    this.todoList = [...filteredList];
  }

}

interface Todo {
  id: string;
  description: string;
  completed: boolean;
}
