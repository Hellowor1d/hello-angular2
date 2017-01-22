import { Component, OnInit, Inject } from '@angular/core';
//@Component是Angular提供的装饰器函数，用来描述Compoent的元数据
//其中selector是指这个组件的在HTML模板中的标签是什么
//template是嵌入（inline）的HTML模板，如果使用单独文件可用templateUrl
//styles是嵌入（inline）的CSS样式，如果使用单独文件可用styleUrls


@Component({
  selector: 'app-login',
  template: `
    <div>
        <input [(ngModel)]="username" type="text" #usernameRef="ngModel" required minlength="3"> {{usernameRef.errors | json}}
        <div *ngIf="usernameRef.errors?.required">this is required</div>
        <div *ngIf="usernameRef.errors?.minlength">should be at least 3 charactors</div>
        <input [(ngModel)]="password" type="password" #passwordRef="ngModel" required> {{passwordRef.errors | json}}
         <div *ngIf="passwordRef.errors?.required">this is required</div>
        <button (click)="onClick()">Login</button>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";


//我们去掉了service的类型声明，但加了一个修饰符@Inject('auth')，这个修饰符的意思是请到系统配置中找到名称为auth的那个依赖注入到我修饰的变量中。
  constructor(@Inject('auth') private service) {
  }

  ngOnInit() {
  }

  onClick(username, password) {
    console.log('auth result is: ' + this.service.loginWithCredentials(this.username, this.password))
  }

}
