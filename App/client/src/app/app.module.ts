import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './modules/core/shared.module';
import { CoreModule } from './modules/core/core.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './AccountRegisteration/login/login.component';
import { BottleCardComponent } from './Cards/bottle-card/bottle-card.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './AccountRegisteration/register/register.component';
import { UserProfileComponent } from './UserProfile/user-profile/user-profile.component';
import { UserProfileEditComponent } from './UserProfile/user-profile-edit/user-profile-edit.component';
import { ShopComponent } from './shop/shop.component';
import { OrdersComponent } from './orders/orders.component'
import { CartComponent } from './Cart/Cart.component';
import { TestErrorsComponent } from './Errors/test-errors/test-errors.component';
import { BottleDetailsComponent } from './bottle-details/bottle-details.component';

import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { SearchPipe } from './pipes/search.pipe';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [	
    AppComponent,
    NavBarComponent,
      BottleCardComponent,
      HomeComponent,
      RegisterComponent,
      LoginComponent,
      UserProfileComponent,
      UserProfileEditComponent,
      ShopComponent,
      OrdersComponent,
      CartComponent,
      TestErrorsComponent,
      BottleDetailsComponent,
      SearchPipe,
      OrderDetailsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
