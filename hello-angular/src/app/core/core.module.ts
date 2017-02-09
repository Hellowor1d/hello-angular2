import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AuthGuardService } from './auth-guard.service';
@NgModule({
  imports: [
    CommonModule
  ],
    providers: [
    { provide: 'auth', useClass: AuthService },
    { provide: 'user', useClass: UserService },
    AuthGuardService
    ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}

//注意到这个模块和其他模块不太一样，原因是我们希望只在应用启动时导入它一次，而不会在其它地方导入它。在模块的构造函数中我们会要求Angular把CoreModule注入自身，这看起来像一个危险的循环注入。不过，@SkipSelf装饰器意味着在当前注入器的所有祖先注入器中寻找CoreModule。如果该构造函数在我们所期望的AppModule中运行，就没有任何祖先注入器能够提供CoreModule的实例，于是注入器会放弃查找。默认情况下，当注入器找不到想找的提供商时，会抛出一个错误。 但@Optional装饰器表示找不到该服务也无所谓。 于是注入器会返回null，parentModule参数也就被赋成了空值，而构造函数没有任何异常。
//那么我们在什么时候会需要这样一个模块？比如在这个模块中我们可能会要提供用户服务（UserService），这样的服务系统各个地方都需要，但我们不希望它被创建多次，希望它是一个单例。再比如某些只应用于AppComponent模板的一次性组件，没有必要共享它们，然而如果把它们留在根目录，还是显得太乱了。我们可以通过这种形式隐藏它们的实现细节。然后通过根模块AppModule导入CoreModule来获取其能力。

