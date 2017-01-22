import { Component, OnInit } from '@angular/core';
//@Component是Angular提供的装饰器函数，用来描述Compoent的元数据
//其中selector是指这个组件的在HTML模板中的标签是什么
//template是嵌入（inline）的HTML模板，如果使用单独文件可用templateUrl
//styles是嵌入（inline）的CSS样式，如果使用单独文件可用styleUrls
@Component({
  selector: 'app-login',
  template: `
    <div>
        <input #usernameRef type="text">
        <input #passwordRef type="password">
        <button (click)="onClick(usernameRef.value)">Login</button>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {
  onClick(username, password){
    console.log("button was clicked,and "+username+" was input")
  }
  constructor() { }

  ngOnInit() {
  }

}
