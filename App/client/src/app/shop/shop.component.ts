import { Component, OnInit} from '@angular/core';
import { Whiskey } from '../models/whiskey';
import { BottlesService } from '../services/bottles.service';
import { Pagination } from '../models/pagination';
import { LoadingService } from '../services/loading.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  whiskey: Whiskey[] = [];
  step = 0;
  value = ''
  searchName: string

  pagination: Pagination
  pageNumber = 1
  pageSize = 10

  whiskeyTypeSelection: string[] = []

  constructor(private bottleService: BottlesService) { }


  ngOnInit(): void {
    this.loadWhiskeyData()
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  pageChanged({page}: any){
    this.pageNumber = page
    this.loadWhiskeyData()
  }

  loadWhiskeyData(){
    this.bottleService.getWhiskeyListData(this.pageNumber, this.pageSize).subscribe((data) => {
      this.whiskey = data.result
      this.pagination = data.pagination
    })
  }

  selectType(button: HTMLElement, value: string){
    if(this.whiskeyTypeSelection.includes(value)) {
      button.style.backgroundColor = 'white'
      button.style.color = 'black'

      this.whiskeyTypeSelection.splice(this.whiskeyTypeSelection.indexOf(value), 1)
    }
    else {
      button.style.backgroundColor = 'black'
      button.style.color = 'white'

      this.whiskeyTypeSelection.push(value)
    }
  }

  loadSortedWhiskeyData(){
    this.bottleService.getSortedWhiskeyData(this.whiskeyTypeSelection, this.pageNumber, this.pageSize).subscribe((data) => {
      this.whiskey = data?.result
      this.pagination = data?.pagination
    })
  }
}
