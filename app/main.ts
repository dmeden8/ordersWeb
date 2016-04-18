import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from "./app.component";
import {MyResourcesService} from "./resources";

bootstrap(AppComponent, [MyResourcesService]);