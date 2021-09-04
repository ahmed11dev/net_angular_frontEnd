import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Account/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './Account/register/register.component';
import { RegisterconfirmComponent } from './Account/registerconfirm/registerconfirm.component';

const routes: Routes = [
  {path: "", component : HomeComponent,pathMatch:'full'},
  {path: "home", component : HomeComponent},
  {path: "register", component : RegisterComponent},
  {path: "login", component : LoginComponent},
   {path: "registerConfirm", component : RegisterconfirmComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
