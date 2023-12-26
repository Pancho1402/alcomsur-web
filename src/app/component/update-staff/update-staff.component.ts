import { Component, OnInit } from '@angular/core';
import { Workers } from 'src/app/model/workers.model';
import { ServiceStaff } from 'src/app/service/staff.service';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.css']
})
export class UpdateStaffComponent implements OnInit{
  titleDropdown:string = 'Empresas'
  nombre:string = '';
  idEmpresa:number = 0;
  staffData: Workers ={
    idEmpresa:0,
    idTrabajador:0,
    nombreEmpresa:'',
    nombre:''
  };

  constructor(
    private serviceStaff:ServiceStaff,
  ){}
  
  
  ngOnInit(): void {

    if (this.staffData) {
      this.idEmpresa = this.staffData.idEmpresa
    }
  }

  clickRequestStaff() {
    if (this.nombre !== '' && this.titleDropdown !== 'Empresas' && this.idEmpresa != 0) {
      const dataUpdate = {nombre: this.nombre, idEmpresa: this.idEmpresa};
      const idUpdate :number = this.staffData.idTrabajador;

      this.updateData(dataUpdate, idUpdate);

      this.nombre = '';
      this.titleDropdown = 'Empresas';
    }
  }

  updateData(dataUpdate: { nombre: string; idEmpresa: number },id: number): void{
    
    this.serviceStaff.updateStaff(dataUpdate, id).subscribe(
      (data:any)=>{
        window.location.reload();
      },
      (error:any) => console.error('error: ',error)
    );
  }
}
