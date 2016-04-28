
export class UserFilter {

    public status: string;

    constructor() {}

    setStatus(status: string) {
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

}