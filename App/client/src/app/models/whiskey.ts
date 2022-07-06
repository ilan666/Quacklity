import { Style } from "./style"
import { Rating } from './rating';

export interface Whiskey {
  id: number,
  name: string,
  age: number,
  bottler: string,
  type: string,
  photoUrl: string,
  price: number,
  region: string
  rating: number,
  rating_Count: number,
  cask_Type: string,
  characteristics: string[],
  colouring: string,
  age_Statement: string,
  proof: number,
  style: Style,
  quantity: number
  currentUserRating: number
  dateRated: Date
}
