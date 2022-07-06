import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { LoadingService } from 'src/app/services/loading.service';
import { AccountService } from '../../services/account.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  maxDate: Date
  bsConfig?: Partial<BsDatepickerConfig>

  nameForm: FormGroup
  passwordForm: FormGroup
  detailsForm: FormGroup
  model: any

  isLinear = true

  constructor(private accountService: AccountService,
              private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private loadingService: LoadingService)
              {
                this.bsConfig = {
                  containerClass: 'theme-dark-blue',
                  dateInputFormat: 'DD/MM/YYYY',
                  isAnimated: true
                }
               }

  ngOnInit() {
    this.initializeRegisterForm()
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  initializeRegisterForm(){

    this.nameForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      nickname: ["", [Validators.maxLength(20), Validators.minLength(0)]],
    })

    this.detailsForm = this.fb.group  ({
      dateOfBirth: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      confirmEmail: ["", [Validators.required, Validators.email, this.matchValues('email')]]
    })

    this.passwordForm = this.fb.group({
      password: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      confirmPassword: ["", [Validators.required, this.matchValues('password')]]
    })

    this.passwordForm.get('password')?.valueChanges.subscribe(() => {
      this.passwordForm.get('confirmPassword')?.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      const controlValue = control.value
      const controlToMatch = (control?.parent as FormGroup)?.controls[matchTo]
      const controlToMatchValue = controlToMatch?.value

      return controlValue === controlToMatchValue ? null : { isMatching: true }
    }

  }

  register(){

    this.loadingService.busy()

    this.model = {
      firstName: this.nameForm.get('firstName')?.value,
      lastName: this.nameForm.get('lastName')?.value,
      nickname: this.nameForm.get('nickname')?.value,
      dateOfBirth: this.detailsForm.get('dateOfBirth')?.value,
      email: this.detailsForm.get('email')?.value,
      password: this.passwordForm.get('password')?.value,
    }

    this.accountService.register(this.model).pipe(delay(2000)).subscribe({
      next: (data) => {
        this.loadingService.idle()
        this.router.navigate(["/"])
        this.snackBar.open(`Success! Welcome ${data.nickname ? data.nickname : data.username}`, 'Close', {
          duration: 3000
        })
      },
      error: (err) => {
        this.snackBar.open('User already exists!', 'Close', {
          duration: 3000
        })
      }
    })

  }

}
