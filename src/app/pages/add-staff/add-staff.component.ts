import { Component, OnInit} from '@angular/core';
import { Workers } from 'src/app/model/workers.model';
import { ServiceCompany } from 'src/app/service/company.service';
import { DataService } from 'src/app/service/dataService.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceStaff } from 'src/app/service/staff.service';
import { Company } from 'src/app/model/company.model';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  isVisibleAlertError:boolean = false;
  textAlertError!:string;
  titleDropdown:string = 'Empresas'
  staff:Workers={
    idEmpresa:0,
    idTrabajador:0,
    nombre:'',
nombreEmpresa:''
  };
  idCompany:number =0;
  companies:Company[] =[];

  constructor(
    private serviceCompany:ServiceCompany,
    private dataService:DataService,
    private serviceStaff:ServiceStaff
  ){}
  
  ngOnInit(){
    this.dataService.dataOutput.subscribe((data) => {
      this.titleDropdown = data.company;
      this.idCompany = data.id;
    });
    this.getData();
  }
   
  getData() {
    this.serviceCompany.getData().subscribe(
      (data: Company[]) => {
        data.forEach((element) => {
          this.companies.push(element);
        });
      },
      (error: any) => {}
    );
  }

  clickRequestStaff():void {
    if(this.staff.nombre !== '' && this.titleDropdown!== 'Empresas') {
      this.isVisibleAlertError=false;

      const dataService = {nombre: this.staff.nombre, idEmpresa: this.idCompany};

      this.postData(dataService);
      this.isVisibleAlertError=false;

      this.staff.nombre ='';
      this.titleDropdown = 'Empresas';
      
    }
    else{

      this.isVisibleAlertError=true;
      let errorMessage:string ='';

      if(this.titleDropdown == 'Empresas'){
        errorMessage = 'Debe seleccionar una empresa';
      }
      if(this.staff.nombre ==''){
        errorMessage = 'Debe completar el campo de nombre';
      }
      
      this.textAlertError = this.staff.nombre == '' && this.titleDropdown== 'Empresas'?
        'debe seleccionar una empresa y completar el campo de nombre': errorMessage;
      
    }
  }

  postData(dataService:{nombre:string, idEmpresa:number}):void{
    this.serviceStaff.postRegisterStaff(dataService).subscribe(
      (data)=>{
          alert('Se Agrego Correctamente');
      },
      (error:any)=>{
        console.error('error: ', error);
      }
    );
  }
}