export class OrderItem {
    constructor(
        public name: string,
        public price: string,
        public amount: string,
        public id: string,
        public measure: string,
        public categoryName: string
    ) {  }
}