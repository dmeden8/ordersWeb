import {Injectable} from "angular2/core";

@Injectable()
export class MyResourcesService {

    private restEndpoint = 'http://localohost:8088/' ;
    private tenantId = '1';
    private rootCategoryId = '1';
    private ordersIntervalRefresh = 60000;
    private usersIntervalRefresh = 60000;

    constructor() {}

    getRestEndpoint() {
        return this.restEndpoint;
    }

    getTenantId() {
        return this.tenantId;
    }

    getRootCategoryId() {
        return this.rootCategoryId;
    }


    getOrdersIntervalRefresh() {
        return this.ordersIntervalRefresh;
    }

    getUsersIntervalRefresh() {
        return this.usersIntervalRefresh;
    }

}