import { Component, OnInit } from '@angular/core';

@Component({
  // 准确的说，moduleI指定，这是由于官方文档是使用System.js打包，而CLI是采用webpack打包造成的
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
