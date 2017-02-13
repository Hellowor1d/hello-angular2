import {
  Component,
  Inject,
  trigger,
  state,
  style,
  transition,
  animate,
  OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MdlDialogService, MdlDialogReference } from 'angular2-mdl';
import { Auth, Image } from '../domain/entities';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';


@Component({
  selector: 'app-login',
  template: `<div
  class="mdl-grid mdl-grid--no-spacing login-container"
  [ngStyle]="{'background-image': 'url(' + photo + ')'}">
  <mdl-layout-spacer
    class="mdl-cell mdl-cell--8-col mdl-cell--4-col-tablet mdl-cell--hide-phone">
  </mdl-layout-spacer>
  <form
    class="mdl-cell mdl-cell--3-col mdl-cell--3-col-tablet mdl-cell--4-col-phone login-form"
    (ngSubmit)="onSubmit()"
    >
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
    <br/>
    <div *ngIf="auth?.hasError" >
      {{auth.errMsg}}
    </div>
    <br/>
    <mdl-textfield
      type="password"
      label="Password..."
      name="password"
      floating-label
      required
      [(ngModel)]="password"
      #passwordRef="ngModel">
    </mdl-textfield>
    <br/>
    <button
      mdl-button mdl-button-type="raised"
      mdl-colored="primary"
      mdl-ripple type="submit"
      [@loginState]="loginBtnState"
      (mouseenter)="toggleLoginState(true)"
      (mouseleave)="toggleLoginState(false)">
      Login
    </button>
    <button
      mdl-button
      mdl-colored="accent"
      (click)="register($event)">
      Register
    </button>
  </form>
  <mdl-layout-spacer></mdl-layout-spacer>
</div>
  `,
  styles: [`
    .login-container{
        height: 940px;
        min-height: 100%;
        max-height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
}
.login-form {
      background-color: transparent;
      display: table;
      padding-top: 50px;
}
    input:focus::-webkit-input-placeholder { color:transparent; }
    input:focus:-moz-placeholder { color:transparent; }

  `],
  animations: [
    trigger('loginState', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active', style({
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnDestroy {

  username = '';
  password = '';
  auth: Auth;
  slides: Image[] = [];
  photo = '/assets/login_default_bg.jpg';
  subscription: Subscription;
  loginBtnState: string = 'inactive';

  //我们去掉了service的类型声明，但加了一个修饰符@Inject('auth')，这个修饰符的意思是请到系统配置中找到名称为auth的那个依赖注入到我修饰的变量中。
  constructor(
    @Inject('auth') private authService,
    @Inject('bing') private bingService,
    private dialogService: MdlDialogService,
    private router: Router) {
    this.bingService.getImageUrl()
      .subscribe((images: Image[]) => {
        this.slides = [...images];
        this.rotateImages(this.slides);
      });
  }

  ngOnInit() {
  }
  //针对observable对象作修改 subscribe
  onSubmit() {
    this.subscription = this.authService
      .loginWithCredentials(this.username, this.password)
      .subscribe(auth => {
        this.auth = Object.assign({}, auth);
        if (!auth.hasError) {
          this.router.navigate(['todo']);
        }
      });
  }
  ngOnDestroy() {
    if (this.subscription !== undefined)
      this.subscription.unsubscribe();
  }
  rotateImages(arr: Image[]) {
    const length = arr.length
    let i = 0;
    setInterval(() => {
      i = (i + 1) % length;
      this.photo = this.slides[i].contentUrl;
    }, 10000);
  }
  toggleLoginState(state: boolean) {
    this.loginBtnState = state ? 'active' : 'inactive';
  }
  register($event: MouseEvent) {
    let pDialog = this.dialogService.showCustomDialog({
      component: RegisterDialogComponent,
      isModal: true,
      styles: { 'width': '350px' },
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400
    });
    pDialog.map((dialogReference: MdlDialogReference) => {
      console.log('dialog visible', dialogReference);
    });

  }
}
