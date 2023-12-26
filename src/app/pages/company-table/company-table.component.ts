import { Component, OnInit } from '@angular/core';
import { ServiceCompany } from 'src/app/service/company.service';
import { Company } from 'src/app/model/company.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UpdateCompanyComponent } from 'src/app/component/update-company/update-company.component';
import { ReportComponent } from 'src/app/component/report/report.component';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.css'],
})
export class CompanyTableComponent implements OnInit {
  companies: Company[] = [];
  bsModalRef: BsModalRef | null = null;
  contCurrentPage: number = 0;
  limitPage: number = 5;
  totalStaff: number = 0;
  contPages: number = 1;

  constructor(
    private companyService: ServiceCompany,
    private modalService: BsModalService
  ) {}
  SelectUpdate(id: number | undefined, company: Company | undefined): void {
    if (company !== undefined) {
      this.bsModalRef = this.modalService.show(UpdateCompanyComponent, {
        initialState: {
          empresa: company.empresa,
          representante: company.representante,
          DataCompany: company,
        },
      });
    }
  }
  SelectDelete(id: number | undefined, nombre: string | undefined): void {
    const isConfirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar a la empresa ${nombre},\n se eliminara todo lo asociado a la empresa ${nombre}`
    );
    if (isConfirmed) {
      this.deleteData(id);
    }
  }
  SelectCompany(company: Company | undefined): void {
    if (company != undefined) {
      this.bsModalRef = this.modalService.show(ReportComponent, {
        initialState: {
          DataCompany: company,
        },
      });
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.companies = [];
    this.companyService.getData().subscribe(
      (data: Company[]) => {
        if (data) {
          this.totalStaff = data.length;
          data.forEach((element) => {
            this.companies.push(element);
          });
        }
      },
      (error: any) => {
        console.error('error: ', error);
      }
    );
  }
  deleteData(id: number | undefined): void {
    this.companyService.deleteData(id).subscribe(
      (data: any) => {
        window.location.reload();
      },
      (error: any) => console.error('error: ', error)
    );
  }

  returnPage() {
    if (this.contCurrentPage > 0) {
      this.contCurrentPage--;
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.companies.length / this.limitPage);
    if (this.contCurrentPage < totalPages - 1) {
      this.contCurrentPage++;
    }
  }
  indexArray(company: Company): number {
    return this.companies.findIndex((element) => element === company);
  }
}
