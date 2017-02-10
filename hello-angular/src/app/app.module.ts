import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdlModule } from 'angular2-mdl';
import { LoginModule } from './login/login.module';
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryTodoDbService } from './todo/todo-data';

import { TodoModule } from './todo/todo.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import { AuthService } from './core/auth.service';
// import { TodoComponent } from './todo/todo.component';
// import { TodoFooterComponent } from './todo/todo-footer/todo-footer.component';
// import { TodoHeaderComponent } from './todo/todo-header/todo-header.component';

@NgModule({
  declarations: [
    AppComponent,
    // TodoComponent,
    // TodoFooterComponent,
    // TodoHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MdlModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryTodoDbService),
    AppRoutingModule,
    TodoModule,
    LoginModule,
    CoreModule
  ],

  providers: [
    //把AuthService起了个别名auth，提供给全应用可用
    //provide定义了这个服务的名称，有需要注入这个服务的就引用这个名称就好。useClass指明这个名称对应的服务是一个类，本例中就是AuthService了
  {provide:'auth', useClass:AuthService}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
