import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { FlowersComponent } from './components/flowers/flowers.component';
import { FlowerDetailComponent } from './components/flower-detail/flower-detail.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [                                      
  {path: 'home' , component:FlowersComponent},
  {path: 'flower/:id', component: FlowerDetailComponent },
  {path: 'cart' , component: CartComponent},
  {path: 'orders' , component: OrdersComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'register' , component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
