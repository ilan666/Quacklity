import { Component, OnInit, ViewChild } from '@angular/core';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { OrderService } from '../services/order.service';
import { Member } from '../models/member';
import { MemberService } from '../services/member.service';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css']
})
export class CartComponent implements OnInit {

  member!: Member
  user!: User
  cart: Cart
  cartItems: CartItem[] = []
  displayedColumns: string[] = ["photo", "product", "quantity", "price", "totalPrice", "remove"]
  dataSource: MatTableDataSource<CartItem>
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('quantity') itemQuantity: number

  constructor(
    private orderService: OrderService,
    private memberService: MemberService,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private route: Router)
     {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => (this.user = user as User))
   }

  ngOnInit() {
    this.loadMember()
  }

  loadMember(){
    this.memberService.getMember(this.user.email).subscribe(member => {
      this.member = member
      this.loadCart()})
  }

  loadCart(){
    this.orderService.getCart(this.member.id).subscribe(cart => {
      this.cart = cart
      this.cartItems = this.cart.cartItems
      this.dataSource = new MatTableDataSource(cart.cartItems)
      this.dataSource.sort = this.sort;
    })
  }

  checkout(){
    this.orderService.checkout().subscribe({
      next: (data) => {
        this.snackBar.open("Purchace confirmed", 'Close', {
          duration: 3000
        })
        this.route.navigate(['/order-details/' + data.id])
      },
      error: () => {
        this.snackBar.open("Please provide a Country, City and address!", 'Edit', {
          duration: 3000
        })
        this.snackBar._openedSnackBarRef?.onAction().subscribe(() => {
          this.route.navigate(['/edit-profile'])
        })
      }
    })
  }

  openDetails(row: MatRow){
    const cartItem = row as CartItem
    this.route.navigate(['/whiskey-details/' + cartItem.whiskey?.id])
  }

  addQuantity(id: number){
    this.orderService.increaseItemQuantity(id).subscribe(() => {
      this.loadCart()
    })
  }

  removeQuantity(item: CartItem){
    if(item.quantity > 1){
      this.orderService.decreaseItemQuantity(item.id).subscribe(() => {
        this.loadCart()
      })
    }

    if(item.quantity == 1){
      this.removeItem(item.id)
    }
  }

  removeItem(id: number){
    this.orderService.removeFromCart(id).subscribe(() => {
      this.snackBar.open("Item removed from cart", "Close", {
        duration: 3000
      })

      this.cartItems = this.cartItems.filter(item => item.id != id)
      this.dataSource = new MatTableDataSource(this.cartItems)
      this.dataSource.sort = this.sort;

      if(this.cartItems.length == 0){
        this.route.navigate(["/store"])
      }
    })
  }
}
