import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {

  baseURL = environment.baseUrl
  validationsErrors: string[] = []

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  get401UnAuthorizedError(){
    this.http.get(this.baseURL + 'buggy/auth').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  get400ValidationError(){
    this.http.post(this.baseURL + 'account/register', {}).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);

        this.validationsErrors = err
      }
    })
  }

  get404NotFoundError(){
    this.http.get(this.baseURL + 'buggy/not-found').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  get400BadRequestError(){
    this.http.get(this.baseURL + 'buggy/bad-request').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  get500ServerError(){
    this.http.get(this.baseURL + 'buggy/server-error').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
