import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

busyRequestCount = 0

constructor(private spinnerService: NgxSpinnerService) { }

busy() {
  this.busyRequestCount++

  this.spinnerService.show(
    undefined,
    {
      bdColor: 'rgb(0,0,0,0.2)',
      color: '#fe5b00',
      type: 'ball-scale-pulse',
      fullScreen: false,
      size: 'medium'
    }
  )
}

idle() {
  this.busyRequestCount--
  if(this.busyRequestCount <= 0){
    this.busyRequestCount = 0
    this.spinnerService.hide()
  }
}

}
