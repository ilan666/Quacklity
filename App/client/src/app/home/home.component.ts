import { Component, OnInit } from '@angular/core';
import { BottlesService } from '../services/bottles.service';
import { Whiskey } from '../models/whiskey';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ratedBottles: Whiskey[]
  filteredBottle: {
    type: string
    minPrice: number
    maxPrice: number
    minRating: number
    maxRating: number
  }

  constructor(private bottleService: BottlesService) { }

  ngOnInit() {
    this.bottleService.getTopRated().subscribe((data) => {
      this.ratedBottles = data
    })
  }
}
