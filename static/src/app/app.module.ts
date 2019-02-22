import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect'
import { ExcelService } from './services/excel.service';

import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DbdetailsComponent } from './dbdetails/dbdetails.component';
import { StartupComponent } from './startup/startup.component';
import {DialogOverviewExampleDialog} from './home/home.component';
import{DialogOverviewExampleDialogstartup} from './startup/startup.component';
import {UploadserviceService} from './uploadservice.service';
import {HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
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

import {ColorDirective} from './directive/color1.directive';
import { AppcolorDirective } from './appcolor.directive'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { CanDeactivate } from '@angular/router/src/utils/preactivation';
import { CanDeactivateGuard } from './home/can-deactivate-guard.service';
import { UserdetailComponent } from './userdetail/userdetail.component';
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
    ColorDirective,
    AppcolorDirective,
    UserdetailComponent
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
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatTooltipModule,
    NgxPaginationModule,
    MultiselectDropdownModule,
    MatProgressSpinnerModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [UploadserviceService,CanDeactivateGuard,ExcelService],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog,DialogOverviewExampleDialogstartup]


})
export class AppModule { }
