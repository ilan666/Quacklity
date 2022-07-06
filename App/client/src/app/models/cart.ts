import { CartItem } from './cartItem';
export interface Cart {
  id: number
  cartItems: CartItem[]
  dateCreated: Date
  numberOfItems: number,
  totalPrice: number
}
