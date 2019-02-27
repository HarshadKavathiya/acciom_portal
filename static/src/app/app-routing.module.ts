import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component';
import { StartupComponent } from './startup/startup.component';
import {UserdetailComponent} from './userdetail/userdetail.component';
import { DbdetailsComponent } from './dbdetails/dbdetails.component';
import { AuthGuard } from "./guards/auth.guard";
import { CanDeactivateGuard } from './home/can-deactivate-guard.service';
import {DashboardComponent} from './dashboard/dashboard.component'
const routes: Routes = [
  {path:'', redirectTo:'/startup', pathMatch:'full'},
  {path:'*', component:HomeComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard], canDeactivate: [CanDeactivateGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path: 'user',component:UserdetailComponent,canActivate:[AuthGuard]},
  {path:'startup',component:StartupComponent,canActivate:[AuthGuard]},
  {path:'db',component:DbdetailsComponent,canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent},
  {path:'**',redirectTo:'/startup', pathMatch: 'full' },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
