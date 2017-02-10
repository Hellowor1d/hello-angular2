import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Auth } from '../domain/entities';
//@Component是Angular提供的装饰器函数，用来描述Compoent的元数据
//其中selector是指这个组件的在HTML模板中的标签是什么
//template是嵌入（inline）的HTML模板，如果使用单独文件可用templateUrl
//styles是嵌入（inline）的CSS样式，如果使用单独文件可用styleUrls


@Component({
  selector: 'app-login',
  template: `
<div>
  <form (ngSubmit)="onSubmit()">
    <mdl-textfield
      type="text"
      label="Username..."
      name="username"
      floating-label
      required
      [(ngModel)]="username"
      #usernameRef="ngModel"
      >
    </mdl-textfield>
    <div *ngIf="auth?.hasError" >
      {{auth?.errMsg}}
    </div>
    <mdl-textfield
      type="password"
      label="Password..."
      name="password"
      floating-label
      required
      [(ngModel)]="password"
      #passwordRef="ngModel">
    </mdl-textfield>
    <button
      mdl-button mdl-button-type="raised"
      mdl-colored="primary"
      mdl-ripple type="submit">
      Login
    </button>
  </form>
</div>
  `,
  styles: [`
    .ng-invalid input{
      border: 3px solid red;
    }
    .ng-valid input{
      border: 3px solid green;
    }
    input:focus::-webkit-input-placeholder { color:transparent; }
    input:focus:-moz-placeholder { color:transparent; }

  `]
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";
  auth: Auth;

  //我们去掉了service的类型声明，但加了一个修饰符@Inject('auth')，这个修饰符的意思是请到系统配置中找到名称为auth的那个依赖注入到我修饰的变量中。
  constructor( @Inject('auth') private service, private router: Router) { }

  ngOnInit() {
  }
//针对observable对象作修改 subscribe
  onSubmit() {
    this.service
      .loginWithCredentials(this.username, this.password)
      .subscribe(auth => {
          // let redirectUrl = (auth.redirectUrl === null || auth.redirectUrl === undefined)
        //   ? '/': auth.redirectUrl;
        this.auth = Object.assign({}, auth);
        if (!auth.hasError) {
          this.router.navigate(['todo']);
        }
      });
  }
}
