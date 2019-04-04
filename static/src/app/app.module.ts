import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect'
import { ExcelService } from './services/excel.service';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DbdetailsComponent } from './dbdetails/dbdetails.component';

import { StartupComponent } from './startup/startup.component';
import{DialogOverviewExampleDialogCaseDetail} from './startup/startup.component'
import {DialogManageConnection} from './startup/startup.component';
import {DialogOverviewExampleDialog} from './home/home.component';
import{DialogOverviewExampleDialogstartup} from './startup/startup.component';
import {UploadserviceService} from './uploadservice.service';
import {HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarlogoutComponent } from './navbarlogout/navbarlogout.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';

import {ColorDirective} from './directive/color1.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { CanDeactivate } from '@angular/router/src/utils/preactivation';
import { CanDeactivateGuard } from './home/can-deactivate-guard.service';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { VerifyuserComponent } from './verifyuser/verifyuser.component';
import { AfterverifyComponent } from './afterverify/afterverify.component';
import {MatSelectModule} from '@angular/material/select';
import { ViewdbComponent } from './viewdb/viewdb.component';
import {MatListModule} from '@angular/material/list';
import { EditdbdetailComponent } from './editdbdetail/editdbdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    NavbarlogoutComponent,
    RegisterComponent,
    UserdetailComponent,
    StartupComponent,
    DbdetailsComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialogstartup,
    DialogOverviewExampleDialogCaseDetail,
    DialogManageConnection,
    ColorDirective,
    UserdetailComponent,
    DashboardComponent,
    ForgotpasswordComponent,
    UpdatepasswordComponent,
    ChangepasswordComponent,
    VerifyuserComponent,
    AfterverifyComponent,
    ViewdbComponent,
    EditdbdetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatRadioModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatSidenavModule,
    MatTooltipModule,
    NgxPaginationModule,
    FlexLayoutModule,
    MultiselectDropdownModule,
    MatProgressSpinnerModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [UploadserviceService,CanDeactivateGuard,ExcelService],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog,DialogOverviewExampleDialogstartup,
    DialogOverviewExampleDialogCaseDetail,DialogManageConnection]


})
export class AppModule { }
