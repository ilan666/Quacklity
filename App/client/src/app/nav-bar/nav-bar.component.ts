import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Observable, take } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';
import { OrderService } from '../services/order.service';
import { MemberService } from '../services/member.service';
import { Member } from '../models/member';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  currentUser$: Observable<User | null>;
  user: User
  member!: Member
  cart: Cart

  constructor(private accountService: AccountService,
              private router: Router,
              private orderService: OrderService,
              private memberService: MemberService,
              private snackBar: MatSnackBar)
  {
    this.currentUser$ = this.accountService.currentUser$
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => (this.user = user as User))
  }

  ngOnInit() {
    this.loadMember()
  }

  logout(){
    this.router.navigateByUrl('/')
    this.accountService.logout()
  }

  loadCart(){
    if(this.member == null)
    {
      this.loadMember()
    }

    this.orderService.getCart(this.member?.id).subscribe(data => {
      if(data != null && data.cartItems.length){
        this.router.navigate(['/cart'])
      }
      else{
        this.snackBar.open('You have no shopping carts', 'Explore', {
          duration: 4500
        })

        this.snackBar._openedSnackBarRef?.onAction().subscribe(() => {
          this.router.navigate(['/store'])
        })
      }
    })
  }

  loadMember(){
    this.memberService.getMember(this.user?.email).subscribe({
      next: (data) => { this.member = data },
      error: () => { console.log("No current user"); }
    })
  }

}
