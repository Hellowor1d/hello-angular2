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

  constructor(private service: TodoService) {}
  ngOnInit() {
    this.getTodos();
  }

   addTodo(){
    this.service
    .addTodo(this.desc)
    .then(todo => {
      this.todos = [...this.todos,todo];
      //...这个貌似省略号的东东是ES7中计划提供的Object Spread操作符，它的功能是将对象或数组“打散，拍平”
      this.desc='';
    })
  }
//打开或关闭todo项
  toggleTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service
      .toggleTodo(todo)
      .then(t => {
        this.todos = [
          ...this.todos.slice(0,i),
          t,
          ...this.todos.slice(i+1)
          ];
      });
  }
  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service
      .deleteTodoById(todo.id)
      .then(()=> {
        this.todos = [
          ...this.todos.slice(0,i),
          ...this.todos.slice(i+1)
        ];
      });
  }
  getTodos(): void {
    this.service
      .getTodos()
      .then(todos => this.todos = [...todos]);
  }
}
