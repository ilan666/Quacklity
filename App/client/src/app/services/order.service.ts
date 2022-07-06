import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';
import { Whiskey } from '../models/whiskey';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

baseAPI = environment.baseUrl

constructor(private http: HttpClient) { }

AddtoCart(id: number){
  return this.http.put(this.baseAPI + "orders/add/" + id, {})
}

decreaseItemQuantity(id: number){
  return this.http.put(this.baseAPI + "orders/decrease/" + id, {})
}

increaseItemQuantity(id: number){
  return this.http.put(this.baseAPI + "orders/increase/" + id, {})
}

removeFromCart(id: number){
  return this.http.delete(this.baseAPI + "orders/" + id)
}

getCart(memberId: number){
  return this.http.get<Cart>(this.baseAPI + 'orders/carts/' + memberId)
}

checkout(){
  return this.http.put<Order>(this.baseAPI + 'orders/checkout', {})
}

getUserOrders(): Observable<Order[]> {
  return this.http.get<Order[]>(this.baseAPI + 'orders/orders' )
}

loadOrder(id: string): Observable<Order> {
  return this.http.get<Order>(this.baseAPI + "orders/" + id)
}

}
