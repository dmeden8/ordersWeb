import {Injectable}     from 'angular2/core';
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {MyResourcesService} from "../resources";
import {Item} from "../data/item";



@Injectable()
export class ItemService {

    constructor (private http: Http, private myService:MyResourcesService) {}

    public getItemList(tenantId: string, categoryId: string) {

        let body = JSON.stringify({ categoryId: categoryId, tenantId: tenantId });
        let headers = new Headers({ 'Content-Type': 'application/json' , 'x-auth-token': localStorage.getItem('id_token')});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.myService.getRestEndpoint() + 'item/list',body,options)
            .map(res => <Item[]> res.json());

    }

    public getItemDetails(itemId: string){

        let headers = new Headers({ 'Content-Type': 'application/json' , 'x-auth-token': localStorage.getItem('id_token')});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.myService.getRestEndpoint() + 'item/details',itemId,options)
            .map(res => <Item> res.json());
    }

    private handleError (error: any) {
        console.error(error);
        return Promise.reject(error.message || error.json().error || 'Server error');
    }

}
