import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { HttpClientModule  } from '@angular/common/http';
import { DateValueAccessor, DateValueAccessorModule } from 'angular-date-value-accessor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatProgressBarModule } from '@angular/material/progress-bar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStaffComponent } from './pages/add-staff/add-staff.component';
import { PersonalTableComponent } from './pages/personal-table/personal-table.component';
import { CheckInComponent } from './pages/check-in/check-in.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { AddCompanyComponent } from './pages/add-company/add-company.component';
import { CompanyTableComponent } from './pages/company-table/company-table.component';
import { LoginComponent } from './pages/login/login.component';
import { NavigationMenuComponent } from './component/navigation-menu/navigation-menu.component';
import { GenerateQRComponent } from './component/generate-qr/generate-qr.component';
import { ReportComponent } from './component/report/report.component';
import { UpdateCompanyComponent } from './component/update-company/update-company.component';
import { UpdateStaffComponent } from './component/update-staff/update-staff.component';
import { DropdownCompanyComponent } from './component/dropdown-company/dropdown-company.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AddStaffComponent,
    PersonalTableComponent,
    CheckInComponent,
    CheckOutComponent,
    AddCompanyComponent,
    CompanyTableComponent,
    LoginComponent,
    NavigationMenuComponent,
    GenerateQRComponent,
    ReportComponent,
    UpdateCompanyComponent,
    UpdateStaffComponent,
    DropdownCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    DateValueAccessor,
    DateValueAccessorModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatProgressBarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
