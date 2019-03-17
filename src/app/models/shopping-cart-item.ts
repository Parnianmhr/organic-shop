import { Product } from './product';

export class ShoppingCartItem {
    // constructor(public product: Product, public quantity: number) {}
    key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    get totalPrice() {
        return this.price * this.quantity;
    }
}
