import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Whiskey } from '../../models/whiskey';
import { OrderService } from '../../services/order.service';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { RatingService } from '../../services/rating.service';
import { Rating } from '../../models/rating';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-bottle-card',
  templateUrl: './bottle-card.component.html',
  styleUrls: ['./bottle-card.component.css']
})
export class BottleCardComponent {

  @Input() rated_whiskey: Whiskey;
  @Input() whiskey: Whiskey;
  @Input() userRatedWhiskey: Whiskey
  member!: Member
  rating: Rating
  @Output() refreshPage = new EventEmitter()

  user: User

  constructor(private orderService: OrderService,
              private snackBar: MatSnackBar,
              private accountService: AccountService,
              private router: Router,
              private ratingService: RatingService,
              private memberService: MemberService) {
                this.accountService.currentUser$.pipe(take(1)).subscribe((user) => (this.user = user as User))
                this.loadMember
               }

  addToCart(id: number){
    this.orderService.AddtoCart(id).subscribe(() => {
      this.snackBar.open('Item added to cart!', 'To cart', {
        duration: 3000,
      })

      this.snackBar._openedSnackBarRef?.onAction().subscribe(() => {
        this.router.navigate(['/cart'])
      })
    })
  }

  loadMember(){
    this.memberService.getMember(this.user.email).subscribe((data) => (this.member = data))
  }

  removeRating(whiskeyID: number){

    this.ratingService.removeRating(whiskeyID).subscribe({
      next: () => {
        this.snackBar.open("Removed rating from this bottle", 'Refresh', {
          duration: 3000
        })
        this.snackBar._openedSnackBarRef?.onAction().subscribe(() => {
          this.refreshPage.emit()
        })
      },
      error: () => {
        this.snackBar.open("Failed remove rating", 'Close', {
          duration: 3000
        })
      }
    })
  }
}
