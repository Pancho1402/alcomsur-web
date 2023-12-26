import { Component } from '@angular/core';
import { Company } from 'src/app/model/company.model';
import { ServiceCompany } from 'src/app/service/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent {
  company: Company ={
    empresa: '',
    representante:'',
    id:0
  };
  
  isVisibleAlertError:boolean = false;
  textAlertError!:string;
  constructor(
    private companyService: ServiceCompany
  ){}

  clickAddCompany(){
    if(this.company.empresa != '' && this.company.representante !=''){
      const dataCompany = {empresa: this.company.empresa, representante: this.company.representante}
      this.postData(dataCompany);
      
      this.company = {
        empresa:'',
        representante:'',
      }
      
      this.isVisibleAlertError=false;
      this.textAlertError ='';
    }
    else{

      this.isVisibleAlertError=true;
      let errorMessage:string ='';

      if(this.company.empresa ==''){
        errorMessage = 'Debe completar el campo de empresa';
      }
      if(this.company.representante ==''){
        errorMessage = 'Debe completar el campo de representante';
      }
      
      this.textAlertError = this.company.empresa == '' && this.company.representante == ''?
        'debe completar el campo de nombre de la empresa y del representante': errorMessage;
      
    }
  }

  private postData(dataCompany:{empresa:string, representante:string}):void {
    this.companyService.postData(dataCompany).subscribe(
      (data:any) =>{
        alert(`se agrego correctamente a la empresa: ${dataCompany.empresa}`);
      },

      (error:any) => {
        console.error("Error: ", error)
      }
    )
  }

}
