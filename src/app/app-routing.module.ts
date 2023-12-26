import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalTableComponent } from './pages/personal-table/personal-table.component';
import { CheckInComponent } from './pages/check-in/check-in.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { AddCompanyComponent } from './pages/add-company/add-company.component';
import { CompanyTableComponent } from './pages/company-table/company-table.component';
import { LoginComponent } from './pages/login/login.component';
import { AddStaffComponent } from './pages/add-staff/add-staff.component';
import { NavigationMenuComponent } from './component/navigation-menu/navigation-menu.component';
import { GenerateQRComponent } from './component/generate-qr/generate-qr.component';
import { ReportComponent } from './component/report/report.component';

const routes: Routes = [
  { path: 'addStaff', component: AddStaffComponent },
  { path: 'personalTable', component: PersonalTableComponent },
  { path: 'checkIn', component: CheckInComponent },

  { path: 'checkOut', component: CheckOutComponent },
  { path: 'addCompany', component: AddCompanyComponent },
  { path: 'companyTable', component: CompanyTableComponent },

  {path: 'generateQR' , component: GenerateQRComponent},
  { path: 'login', component: LoginComponent },

  { path: 'menu', component:  NavigationMenuComponent},

  { path: 'reporter', component: ReportComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
