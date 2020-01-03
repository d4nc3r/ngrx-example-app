import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { featureName, reducers } from './reducers';
import { ListEffects } from './effects/todo.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    HttpClientModule,
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([ListEffects])
  ]
})
export class TodoModule { }
