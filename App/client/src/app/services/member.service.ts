import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseUrl = environment.baseUrl
  member: Member

  constructor(private http: HttpClient) { }

  getMember(email: string){
    return this.http.get<Member>(this.baseUrl + 'users/' + email)
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + 'users', member)
    .pipe(
      tap(_ => this.member = member)
    )
  }
}
