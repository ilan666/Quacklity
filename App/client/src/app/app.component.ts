import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser()
  }

  setCurrentUser(){
    const userFromLocalStorage: any = localStorage.getItem('user')
    const user = JSON.parse(userFromLocalStorage)
    this.accountService.setCurrentUser(user)
  }

  // This is importent because it is searching the user data in the local storage and
  // remember the token so the user will not login each time on page refresh etc.
}
