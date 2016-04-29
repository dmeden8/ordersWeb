import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from "./app.component";
import {MyResourcesService} from "./resources";
import {enableProdMode} from 'angular2/core';

enableProdMode();

bootstrap(AppComponent, [MyResourcesService]);