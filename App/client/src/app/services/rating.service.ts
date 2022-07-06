import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rating } from '../models/rating';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

baserUrl = environment.baseUrl

constructor(private http: HttpClient) { }

addRating(rating: Rating){
  return this.http.put(this.baserUrl + 'rating', rating)
}

removeRating(whiskeyID: number){
  return this.http.delete(this.baserUrl + 'rating/remove-rate/' + whiskeyID)
}

}
