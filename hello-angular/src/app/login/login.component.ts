import { Component, OnInit } from '@angular/core';
//@Component是Angular提供的装饰器函数，用来描述Compoent的元数据
//其中selector是指这个组件的在HTML模板中的标签是什么
//template是嵌入（inline）的HTML模板，如果使用单独文件可用templateUrl
//styles是嵌入（inline）的CSS样式，如果使用单独文件可用styleUrls


//传统方式引入authService
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-login',
  template: `
    <div>
        <input #usernameRef type="text">
        <input #passwordRef type="password">
        <button (click)="onClick(usernameRef.value, passwordRef.value)">Login</button>
    </div>
  `,
  styles: [],
   //在providers中配置AuthService(为了使用依赖注入()的方式调用authservice)
  providers:[AuthService]
})
export class LoginComponent implements OnInit {

  // 声明成员变量，其类型为AuthService
  // service: AuthService;//在构造函数中将AuthService示例注入到成员变量service之后，注释掉

//用传统方式调用service
  onClick(username, password) {
    console.log('auth result is: ' + this.service.loginWithCredentials(username, password))
  }
 //在构造函数中将AuthService示例注入到成员变量service中
  //而且我们不需要显式声明成员变量service了
  constructor(private service: AuthService) {
  }

  ngOnInit() {
  }

}
