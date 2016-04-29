import {Injectable}     from 'angular2/core';
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {MyResourcesService} from "../resources";
import {Order} from "../data/order";
import {OrderItem} from "../data/orderItem";
import {User} from "../data/user";
import {OrderStatus} from "../data/orderStatus";
import {OrderFilter} from "../data/orderFilter";



@Injectable()
export class OrderService {

    constructor (private http: Http, private myService:MyResourcesService) {}

    public getOrderList(orderFilter: OrderFilter){

        let body = JSON.stringify({ userId: orderFilter.getUserId(), tenantId: this.myService.getTenantId(), status: orderFilter.getStatus() });
        let headers = new Headers({ 'Content-Type': 'application/json' , 'x-auth-token': localStorage.getItem('id_token')});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.myService.getRestEndpoint() + 'order/list',body,options)
             .map(res => res.json());

    }

    public getOrderItems(orderId: string){

        let headers = new Headers({ 'Content-Type': 'application/json' , 'x-auth-token': localStorage.getItem('id_token')});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.myService.getRestEndpoint() + 'order/items',orderId,options)
            .map(res => <OrderItem[]> res.json());
    }

    public getOrderDetails(orderId: string){

        let headers = new Headers({ 'Content-Type': 'application/json' , 'x-auth-token': localStorage.getItem('id_token')});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.myService.getRestEndpoint() + 'order/details',orderId,options)
            .map(res => <Order> res.json());
    }

    public changeOrderStatus(orderId: string, orderStatus: string){

        let body = JSON.stringify({ orderId: orderId, status: orderStatus });
        let headers = new Headers({ 'Content-Type': 'application/json' , 'x-auth-token': localStorage.getItem('id_token')});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.myService.getRestEndpoint() + 'order/changestatus',body,options);
    }

    public countByStatus(orderStatus: string){

        let body = JSON.stringify({ orderId: null, status: orderStatus });
        let headers = new Headers({ 'Content-Type': 'application/json' , 'x-auth-token': localStorage.getItem('id_token')});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.myService.getRestEndpoint() + 'order/countstatus',body,options)
            .map(res => <number> res.json());
    }


    private handleError (error: any) {
        console.error(error);
        return Promise.reject(error.message || error.json().error || 'Server error');
    }

}
