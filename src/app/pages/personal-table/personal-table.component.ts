import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Workers } from 'src/app/model/workers.model';
import { DataService } from 'src/app/service/dataService.service';
import { ServiceCompany } from 'src/app/service/company.service';

import { Company } from 'src/app/model/company.model';
import { ServiceStaff } from 'src/app/service/staff.service';
import { UpdateStaffComponent } from 'src/app/component/update-staff/update-staff.component';
import { GenerateQRComponent } from 'src/app/component/generate-qr/generate-qr.component';

@Component({
  selector: 'app-personal-table',
  templateUrl: './personal-table.component.html',
  styleUrls: ['./personal-table.component.css'],
})
export class PersonalTableComponent implements OnInit {
  titleDropdown: string = 'Empresas';
  companies: Company[] = [];
  workers: Workers[] = [];
  bsModalRef: BsModalRef | null = null;
  contCurrentPage:number = 0;
  limitPage:number = 5;
  totalStaff:number=0;
  contPages:number = 1;

  constructor(
    private router: Router,
    private dataService: DataService,
    private companyService: ServiceCompany,
    private staffService: ServiceStaff,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.dataService.dataOutput.subscribe((data) => {
      this.titleDropdown = data.company;
      this.workers=[];
      this.getDataStaff(data.company);
    });
  }

  GenerateQR(staff:Workers){
    if(staff !== undefined){
      this.bsModalRef = this.modalService.show(GenerateQRComponent,{
        initialState: {
          staffData: staff
        }
      });
    }
  }
  SelectUpdate(idstaff:number, staff:Workers):void{
    if (staff !== undefined) {
      this.bsModalRef = this.modalService.show(UpdateStaffComponent, {
        initialState: {
          nombre: staff.nombre,
          titleDropdown: this.titleDropdown,
          staffData: staff
        },
      });
    }
  }
  
  SelectDelete(id:number, nombre:String):void{
  const isConfirmed = window.confirm(
    `¿Estás seguro de que deseas eliminar a ${nombre},\n se eliminara todo lo asociado a ${nombre}`);
    if (isConfirmed) {
      this.deleteData(id);
    }
  }
  
  getData(): void {
    this.companyService.getData().subscribe(
      (data: Company[]) => {
        data.forEach((element) => {
          this.companies.push(element);
        });
      },
      (error: any) => console.error('Error: ', error)
    );
  }

  getDataStaff(endPoint:string):void{
    this.staffService.getData(endPoint).subscribe(
      (data:Workers[])=>{
        if(data){
          this.totalStaff = data.length;
          data.forEach((element)=>{
              this.workers.push(element);
          });
        }
      },
      (error: any) => console.error('Error: ', error)
    );
  }

  deleteData(id:number):void {
    this.staffService.deleteStaff(id).subscribe(
      (data)=>{
        window.location.reload();
      },
      (error:any) => console.error('Error: ', error)
    );
  }
  returnPage(){
    if(this.contCurrentPage > 0){
      this.contCurrentPage --;

    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.workers.length / this.limitPage);
    if (this.contCurrentPage < totalPages - 1) {
      this.contCurrentPage++;
    }
  }
  indexArray(staff: Workers):number{
    return this.workers.findIndex((element) => element === staff);
  }
}
