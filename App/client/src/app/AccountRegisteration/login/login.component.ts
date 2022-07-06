import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  validationErrors: string[] = []

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService) { }

  ngOnInit() {
    this.initializeLoginForm()
  }

  initializeLoginForm(){
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })
  }

  login(){
    this.loadingService.busy()

    this.accountService.login(this.loginForm.value).pipe(delay(2000)).subscribe({
      next: (data) => {
        this.loadingService.idle()
        this.router.navigate(["/"])
        this.snackBar.open(`Welcome back, ${data.nickname ? data.nickname : data.username}`, 'Close', {
          duration: 3000
        })
      },
      error: () => {
        this.loadingService.idle()
        this.snackBar.open('Email or Password is incorrect', 'Close', {
          duration: 3000
        })
        this.loginForm.reset()
      }
    })
  }
}
