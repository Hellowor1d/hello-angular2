import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
@Component({
  // 准确的说，moduleI指定，这是由于官方文档是使用System.js打包，而CLI是采用webpack打包造成的
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [ TodoService ]
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  desc = '';

  constructor(private service:TodoService) { }

  ngOnInit() {
  }

   addTodo(){
    this.todos = this.service.addTodo(this.desc);
    this.desc = '';
  }

}
