import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private snackbar: MatSnackBar,
              private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError(err => {
          switch(err.status) {
            case 400:
              if(err.error?.errors) {
                const modelStateErrors: string [][] = []
                for (const key in err.error.errors) {
                  if (err.error.errors[key]) {
                    modelStateErrors.push(err.error.errors[key])
                  }
                }
                throw modelStateErrors.flat()
              }
              else if(typeof(err.error) === 'object') {
                this.snackbar.open((err.statusText === 'OK' ? 'Bad Request' : err.statusText), 'Close', {
                  duration: 3000
                })
                throw err
              }
              else {
                this.snackbar.open((err.error), 'Close', {
                  duration: 3000
                })
                throw err
              }
              break;

              case 401:
                console.log
                (err.statusText === 'OK' ? 'UnAuthorized' : err.statusText);
                break;

              case 404:
                this.router.navigateByUrl('/not-found')
                break;

              case 500:
                const navigationExtras: NavigationExtras = { state: { error: err.error } };
                this.router.navigateByUrl('/server-error', navigationExtras)
                break;

              default:
                this.snackbar.open('Something unexpected went wrong', 'Close', {
                  duration: 3000
                })
                console.log(err);
                break;
          }
          throw throwError(err)
        })
      )
  }
}
