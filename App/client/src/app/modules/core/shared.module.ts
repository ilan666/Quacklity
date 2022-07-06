import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FileUploadModule } from 'ng2-file-upload';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NgxSpinnerModule } from "ngx-spinner";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    MatStepperModule,
    BsDropdownModule.forRoot(),
    MatButtonModule,
    MatSidenavModule,
    MatDividerModule,
    TabsModule.forRoot(),
    FileUploadModule,
    MatExpansionModule,
    MatSliderModule,
    MatRadioModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatRippleModule,
    MatSelectModule,
    PaginationModule,
    MatButtonToggleModule,
    RatingModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule
  ],
  exports: [
    BsDatepickerModule,
    MatStepperModule,
    BsDropdownModule,
    MatButtonModule,
    MatSidenavModule,
    MatDividerModule,
    TabsModule,
    FileUploadModule,
    MatExpansionModule,
    MatSliderModule,
    MatRadioModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatRippleModule,
    MatSelectModule,
    PaginationModule,
    MatButtonToggleModule,
    RatingModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule
  ],

  declarations: []
})
export class SharedModule { }
