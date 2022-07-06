import { CartItem } from './cartItem';
export interface Order {
  id: number
  memberId: number
  orderDate: Date
  payedWith: string
  address: string
  items: CartItem[]
  totalPrice: number
}
