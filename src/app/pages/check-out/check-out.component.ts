import { Component, OnInit } from '@angular/core';
import { Workers } from 'src/app/model/workers.model';
import { Company } from 'src/app/model/company.model';
import { DataService } from 'src/app/service/dataService.service';
import { ServiceCompany } from 'src/app/service/company.service';
import { CheckOutService } from 'src/app/service/ckeckOut.service';
import { ICheckOut } from 'src/app/model/checkOut.model';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  titleDropdown: string = 'Empresas';
  companies: Company[] = [];
  inputDate!: string;
  outputData:ICheckOut[] = [];
  todayDate!:string;
  contCurrentPage: number = 0;
  limitPage: number = 5;
  totalStaff: number = 0;
  contPages: number = 1;

  constructor(
    private dataService: DataService,
    private companyService: ServiceCompany,
    private checkService: CheckOutService
  ) {}
  
  SendDataonChange(event: any) {
    this.inputDate = event.target.value;
    this.preparingEndPoint();
  }

  SelectDelete(id:number | undefined):void{
    
  }
  ngOnInit(): void {
    this.dataService.dataOutput.subscribe(data =>{
      this.titleDropdown = data.company;
      
      if (this.inputDate == undefined) {
        this.inputDate = '';
      }
      this.preparingEndPoint();
    })
    this.getData();
  }
  getData(): void {

    this.companyService.getData().subscribe(
      (data:Company[]) => {
        data.forEach((element)=>{
          this.companies.push(element);
        });
      },
      (error:any) => {}
    );
  }
  
  preparingEndPoint(): void {
    if (this.titleDropdown != 'Empresas' && this.inputDate != '') {
      this.getCheckIn({
        endPointCompany: this.titleDropdown,
        endPointDate: this.inputDate,
      });
    } else if (this.titleDropdown != 'Empresas' && this.inputDate == '') {
      
      const hoy = new Date();
      const anio = hoy.getFullYear();
      const month = ('0' + (hoy.getMonth() + 1)).slice(-2);
      const date = ('0' + hoy.getDate()).slice(-2);

      this.inputDate = `${anio}-${month}-${date}`;
      
      this.getCheckIn({
        endPointCompany: this.titleDropdown,
        endPointDate: this.inputDate,
      });
    }
  }

  getCheckIn(endpoint:{endPointCompany:string | null, endPointDate:string | null}) {
    this.outputData =[];
    this.checkService.getData(endpoint).subscribe(
      (data:ICheckOut[]) =>{
        this.totalStaff = data.length;
        data.forEach((element)=>{
          this.outputData.push(element);
        });
        
      },
      (error:any) =>{
        console.error('Error: ', error);
      }

    );
  }
  returnPage() {
    if (this.contCurrentPage > 0) {
      this.contCurrentPage--;
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.outputData.length / this.limitPage);
    if (this.contCurrentPage < totalPages - 1) {
      this.contCurrentPage++;
    }
  }
  indexArray(data: ICheckOut): number {
    return this.outputData.findIndex((element) => element === data);
  }

}
