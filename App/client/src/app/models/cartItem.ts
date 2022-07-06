import { Whiskey } from './whiskey';
export interface CartItem {
  id: number,
  cartID: number,
  whiskey: Whiskey,
  dateAdded: Date
  quantity: number,
  price: number
}
