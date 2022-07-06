import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './AccountRegisteration/login/login.component';
import { RegisterComponent } from './AccountRegisteration/register/register.component';
import { UserProfileComponent } from './UserProfile/user-profile/user-profile.component';
import { UserProfileEditComponent } from './UserProfile/user-profile-edit/user-profile-edit.component';
import { ShopComponent } from './shop/shop.component';
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './Cart/Cart.component';
import { TestErrorsComponent } from './Errors/test-errors/test-errors.component';
import { NotFoundComponent } from './Errors/not-found/not-found.component';
import { ServerErrorComponent } from './Errors/server-error/server-error.component';
import { AuthGuard } from './guards/auth.guard';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { BottleDetailsComponent } from './bottle-details/bottle-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AboutComponent } from './about/about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'edit-profile', component: UserProfileEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      { path: 'orders', component: OrdersComponent },
      { path: 'order-details/:id', component: OrderDetailsComponent },
      { path: 'cart', component: CartComponent }
    ]
  },
  { path: 'store', component: ShopComponent },
  { path: 'about', component: AboutComponent },
  { path: "whiskey-details/:id", component: BottleDetailsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'test-errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
