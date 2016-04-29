import {Injectable}     from 'angular2/core';
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {MyResourcesService} from "../resources";
import {User} from "../data/user";
import {OrderFilter} from "../data/orderFilter";
import {UserFilter} from "../data/userFilter";



@Injectable()
export class UserService {

    constructor (private http: Http, private myService:MyResourcesService) {}

    public onSubmit(username: string, password: string) {

        var creds = btoa(username + ':' + password);

        let headers = new Headers({ 'Content-Type': 'application/json' , 'Authorization': 'Basic ' + creds});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.myService.getRestEndpoint() + 'login',null, options)
            .map(res => <string> res.headers.get('x-auth-token'));

        /**.toPromise()
         .then(res => <Response>res)
         .catch(this.handleError);*/
    }

    public getUsers(userFilter: UserFilter){

        let body = JSON.stringify({ tenantId: this.myService.getTenantId(), status: userFilter.getStatus() });
        let headers = new Headers({ 'Content-Type': 'application/json' , 'x-auth-token': localStorage.getItem('id_token')});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.myService.getRestEndpoint() + 'user/list',body,options)
            .map(res => <User[]> res.json());
    }

    public getUserDetails(userId: string){

        let headers = new Headers({ 'Content-Type': 'application/json' , 'x-auth-token': localStorage.getItem('id_token')});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.myService.getRestEndpoint() + 'user/details',userId,options)
            .map(res => <User> res.json());
    }

    public changeUserStatus(userId: string, userStatus: string){

        let body = JSON.stringify({ userId: userId, status: userStatus });
        let headers = new Headers({ 'Content-Type': 'application/json' , 'x-auth-token': localStorage.getItem('id_token')});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.myService.getRestEndpoint() + 'user/changestatus',body,options);
    }

    public countByStatus(userStatus: string){

        let body = JSON.stringify({ userId: null, status: userStatus });
        let headers = new Headers({ 'Content-Type': 'application/json' , 'x-auth-token': localStorage.getItem('id_token')});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.myService.getRestEndpoint() + 'user/countstatus',body,options)
            .map(res => <number> res.json());
    }

    private handleError (error: any) {
        console.error(error);
        return Promise.reject(error.message || error.json().error || 'Server error');
    }

}
