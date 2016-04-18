export class Order {
    constructor(
        public creationTime: string,
        public status: string,
        public totalPrice: string,
        public userName: string,
        public id: string
    ) {  }
}