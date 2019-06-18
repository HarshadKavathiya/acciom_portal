import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component';
import { StartupComponent } from './startup/startup.component';
import {UserdetailComponent} from './userdetail/userdetail.component';
import { DbdetailsComponent } from './dbdetails/dbdetails.component';
import { AuthGuard } from "./guards/auth.guard";
// import { CanDeactivateGuard } from './home/can-deactivate-guard.service';
import {DashboardComponent} from './dashboard/dashboard.component'
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { VerifyuserComponent } from './verifyuser/verifyuser.component';
import { AfterverifyComponent } from './afterverify/afterverify.component';
import { ViewdbComponent } from './viewdb/viewdb.component';
import { EditdbdetailComponent } from './editdbdetail/editdbdetail.component';
import { ViewtestcaseComponent } from './viewtestcase/viewtestcase.component';
import {CanDeactivateGuard} from './viewtestcase/can-deactivate-guard.service'


const routes: Routes = [
  {path:'', redirectTo:'/startup', pathMatch:'full'},
  {path:'*', component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path: 'user',component:UserdetailComponent,canActivate:[AuthGuard]},
  {path:'startup',component:StartupComponent,canActivate:[AuthGuard]},
  {path:'add-db',component:DbdetailsComponent,canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent},
  {path:'forgot-password',component:ForgotpasswordComponent},
  {path:'changepassword',component:ChangepasswordComponent},
  {path:'reset-password/:token',component:UpdatepasswordComponent},
  {path:'Verifyuser',component:VerifyuserComponent},
  {path:'verified/:token',component:AfterverifyComponent},
  {
    path:'Viewdb',component:ViewdbComponent},
    {path:'editdb/:db_id',component:EditdbdetailComponent},
    {path: 'Viewtestcase',component:ViewtestcaseComponent,canDeactivate:[CanDeactivateGuard]},
  {path:'**',redirectTo:'/startup', pathMatch: 'full' },
];
// canDeactivate: [CanDeactivateGuard]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
