
export class OrderFilter {

    public userId: string;
    public status: string;

    constructor() {}

    setUserId(userId: string) {
        this.userId = userId;
    }

    setStatus(status: string) {
        this.status = status;
    }

    getUserId() {
        return this.userId;
    }

    getStatus() {
        return this.status;
    }

}