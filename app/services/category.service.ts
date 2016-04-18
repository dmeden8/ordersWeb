import {Injectable}     from 'angular2/core';
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {MyResourcesService} from "../resources";
import {Item} from "../data/item";
import {Category} from "../data/category";



@Injectable()
export class CategoryService {

    constructor (private http: Http, private myService:MyResourcesService) {}

    public getChildCategories(categoryId: string, tenantId: string){

        let body = JSON.stringify({ categoryId: categoryId, tenantId: tenantId });
        let headers = new Headers({ 'Content-Type': 'application/json' , 'x-auth-token': localStorage.getItem('id_token')});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.myService.getRestEndpoint() + 'category/children',body,options)
            .map(res => <Category[]> res.json());
    }

    private handleError (error: any) {
        console.error(error);
        return Promise.reject(error.message || error.json().error || 'Server error');
    }

}
