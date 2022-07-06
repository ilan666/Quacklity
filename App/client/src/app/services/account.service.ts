import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.baseUrl
  private currentUserSource$ = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource$.asObservable();

constructor(private http: HttpClient) { }

  setCurrentUser(user: User){
    localStorage.setItem('user', JSON.stringify(user))
    this.currentUserSource$.next(user)
  }

  login(model: any){
    return this.http.post<User>(this.baseUrl + 'account/login', model)
    .pipe(
      map((response) => {
        const user = response;
        if(user)
        {
          this.setCurrentUser(user)
        }
        return user
      })
    )
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model)
    .pipe(
      map((user: User) => {
        if(user){
          this.setCurrentUser(user)
        }
        return user
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource$.next(null);
  }
}
