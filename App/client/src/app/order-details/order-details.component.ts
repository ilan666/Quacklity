import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { Member } from '../models/member';
import { MemberService } from '../services/member.service';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { CartItem } from '../models/cartItem';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: Order
  member: Member
  user: User
  displayedColumns: string[] = ["photo", "product", "quantity", "item Price", "total"]
  dataSource: MatTableDataSource<CartItem>

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private memberService: MemberService,
              private accountService: AccountService) {
                this.accountService.currentUser$.pipe(take(1)).subscribe((user) => (this.user = user as User))
               }

  ngOnInit() {
    this.loadOrder()
    this.loadMember()
  }

  loadOrder(){
    const orderID = this.route.snapshot.paramMap.get('id') as string

    this.orderService.loadOrder(orderID).subscribe((data) => {
      this.order = data
      this.dataSource = new MatTableDataSource(this.order.items)
    })
  }

  loadMember(){
    this.memberService.getMember(this.user.email).subscribe((data) => (this.member = data))
  }

}
