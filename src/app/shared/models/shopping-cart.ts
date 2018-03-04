import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productID: string]: ShoppingCartItem }) {
        this.itemsMap = this.itemsMap || {};

        for (const productID in itemsMap) {
            if (productID) {
                const item = itemsMap[productID];
                this.items.push(new ShoppingCartItem({...item, $key: productID}));
            }
        }
    }

    get totalItemsCount(): number {
        let count = 0;
        for (const item in this.items) {
            if (item) {
                count += this.items[item].quantity;
            }
        }
        return count;
    }

    get totalPrice(): number {
        let sum = 0;
        for (const productID in this.items) {
            if (productID) {
                sum += this.items[productID].totalPrice;
            }
        }
        return sum;
    }

    getQuantity(product: Product): number {
        const item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
    }
}
