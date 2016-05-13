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

    public getItemList(categoryId: string) {

        let body = JSON.stringify({ categoryId: categoryId, tenantId: this.myService.getTenantId() });
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

    public getDiscountItems(){

        let headers = new Headers({ 'Content-Type': 'application/json' , 'x-auth-token': localStorage.getItem('id_token')});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.myService.getRestEndpoint() + 'item/discountlist',this.myService.getTenantId(),options)
            .map(res => <Item[]> res.json());
    }

    public changeItemDiscount(discount: string, itemId: string){

        let body = JSON.stringify({ discount: discount, itemId: itemId });
        let headers = new Headers({ 'Content-Type': 'application/json' , 'x-auth-token': localStorage.getItem('id_token')});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.myService.getRestEndpoint() + 'item/discount',body,options);
    }

    private handleError (error: any) {
        console.error(error);
        return Promise.reject(error.message || error.json().error || 'Server error');
    }

}
