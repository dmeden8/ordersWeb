///<reference path="../../../node_modules/angular2/ts/typings/node/node.d.ts"/>
import {Component, View, ViewEncapsulation, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {RequestOptions, HTTP_PROVIDERS, Http, Headers, Response} from "angular2/http";
import {Router} from "angular2/router";
import {error} from "util";
import {Observable} from "rxjs/Observable";
import {UserService} from "../../services/user.service";
import {User} from "../../data/user";
import {UserAccount} from "../../data/userAccount";




@Component({
    selector: 'login',
    templateUrl: 'app/components/login/login.component.html',
    directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [HTTP_PROVIDERS]
})

export class LoginComponent implements OnInit {

    model = new UserAccount('','');
    loginOk = true;

    constructor(
        private _userService: UserService,
        private _router: Router) {}


    onSubmit() {
        this._userService.onSubmit(this.model.username, this.model.password)
            .subscribe(
                (response) => {
                    localStorage.setItem('id_token', response);
                    localStorage.setItem('username', this.model.username);
                    this._router.navigate(['Orders']);
                },
                (err) => {
                    this._router.navigate(['Login']);
                    this.loginOk = false;
                }
            );
    }

    ngOnInit() {

    }

}
