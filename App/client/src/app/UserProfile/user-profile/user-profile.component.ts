import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Member } from '../../models/member';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { MemberService } from '../../services/member.service';
import { Whiskey } from '../../models/whiskey';
import { BottlesService } from '../../services/bottles.service';
import { Pagination } from 'src/app/models/pagination';
import { RatingService } from 'src/app/services/rating.service';
import { Rating } from 'src/app/models/rating';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user!: User
  member: Member
  ratedBottles: Whiskey[] = []
  wishedBottles: Whiskey[] = []
  topRatedBottles: Whiskey[] = []
  rating: Rating[] = []

  pagination: Pagination
  pageNumber = 1
  pageSize = 10

  constructor(private accountService: AccountService,
               private memberService: MemberService,
               private bottleService: BottlesService,
               private ratingService: RatingService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => (this.user = user as User))
   }

  ngOnInit() {
    this.loadMember();
    this.getUserLatestRatedBottles();
    this.getUserTopRatedBottles();
  }

  loadMember(){
    this.memberService.getMember(this.user.email).subscribe((member) => {
      this.member = member
    })
  }

  getUserLatestRatedBottles(){
    this.bottleService.getUserRatedBottles(this.pageNumber, this.pageSize).subscribe((data) => {
      this.ratedBottles = data.result.sort((a, b) => new Date(b.dateRated).getTime() - new Date(a.dateRated).getTime())
      this.pagination = data.pagination
    })
  }

  getUserTopRatedBottles(){
    this.bottleService.getUserRatedBottles(this.pageNumber, this.pageSize).subscribe((data) => {
      this.topRatedBottles = data.result.sort((a, b) => b.currentUserRating - a.currentUserRating)
      this.pagination = data.pagination
    })
  }

  refreshPage(){
    this.getUserTopRatedBottles()
    this.getUserLatestRatedBottles()
  }

}
