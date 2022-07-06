import { Cart } from './cart';
import { Order } from './order';
export interface Member {
  id: number,
  firstName: string,
  lastName: string,
  nickname: string
  age: number,
  photoUrl: string,
  createdAt: Date,
  LastActive: Date,
  city: string,
  country: string,
  description: string,
  email: string,
  website: string
  cart: Cart
  ratings: number,
  orders: number
  homeAddress: string
}
