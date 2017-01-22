import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}
//Angular编译器在浏览器中编译并引导该应用
platformBrowserDynamic().bootstrapModule(AppModule);

// AoT 预编译模式
// // 不把编译器发布到浏览器
// import { platformBrowser } from '@angular/platform-browser';

// // 静态编译器会生成一个AppModule的工厂AppModuleNgFactory
// import { AppModuleNgFactory } from './app.module.ngfactory';

// // 引导AppModuleNgFactory
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
