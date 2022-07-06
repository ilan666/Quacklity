import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Whiskey } from '../models/whiskey';
import { BottlesService } from '../services/bottles.service';
import { OrderService } from '../services/order.service';
import { Member } from '../models/member';
import { MemberService } from '../services/member.service';
import { AccountService } from '../services/account.service';
import { take } from 'rxjs';
import { User } from '../models/user';
import { Rating } from '../models/rating';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-bottle-details',
  templateUrl: './bottle-details.component.html',
  styleUrls: ['./bottle-details.component.css']
})
export class BottleDetailsComponent implements OnInit {

  whiskey!: Whiskey
  member: Member
  user: User
  rate: number
  rating: Rating
  overStar: number | undefined

  constructor(private bottleService: BottlesService,
              private route: ActivatedRoute,
              private orderService: OrderService,
              private snackBar: MatSnackBar,
              private memberService: MemberService,
              private accountService: AccountService,
              private ratingService: RatingService,
              private router: Router) {
                this.accountService.currentUser$.pipe(take(1)).subscribe((user) => (this.user = user as User))
               }

  ngOnInit() {
    this.loadWhiskey()
    this.memberService.getMember(this.user?.email).subscribe((member) => (this.member = member))
  }

  loadWhiskey(){
    const whiskeyID = this.route.snapshot.paramMap.get('id') as string

    this.bottleService.getWhiskeyData(parseInt(whiskeyID)).subscribe((data) => {
      this.whiskey = data
    })
  }

  addToCart(id: number){
    this.orderService.AddtoCart(id).subscribe(() => {
      this.snackBar.open('Item added to cart!', 'To cart', {
        duration: 3000
      })

      this.snackBar._openedSnackBarRef?.onAction().subscribe(() => {
        this.router.navigate(['/cart'])
      })
    })
  }

  addRating(){
    this.rating = {
      userId: this.member.id,
      whiskeyId: this.whiskey.id,
      rate: this.rate
    }

    this.ratingService.addRating(this.rating).subscribe(() => {
      this.snackBar.open('Your rate added!', 'Close', {
        duration: 3000
      })
    })
  }

}
