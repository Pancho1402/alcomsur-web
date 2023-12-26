import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/model/company.model';
import { ServiceCompany } from 'src/app/service/company.service';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit{
  DataCompany!: Company;
  empresa:string ='';
  representante:string = '';

  constructor(private companyService: ServiceCompany){}

  clickUpdateCompany(){
    if(this.empresa !== '' && this.representante !== '' && this.DataCompany.id != 0){

      const dataUpdate = {empresa: this.empresa, representante: this.representante};
      const idUpdate:number | undefined= this.DataCompany.id;

      this.updateData(dataUpdate, idUpdate);
      this.empresa ='';
      this.representante='';
    }
  }
  
  ngOnInit(): void {
    
    if (this.DataCompany) {
    }
    
  }
  updateData(dataUpdate: { empresa: string; representante: string },id: number | undefined):void{
    this.companyService.putData(dataUpdate,id).subscribe(
      (data)=>{
        window.location.reload();},
      (error: any) => console.error('Error: '+error),
    );
  }
}
