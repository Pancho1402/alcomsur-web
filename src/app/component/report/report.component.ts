import { Component, OnInit } from '@angular/core';
import { Workers } from 'src/app/model/workers.model';
import { Reporter } from 'src/app/model/report.model';
import { ReporterService } from 'src/app/service/report.service';
import { Company } from 'src/app/model/company.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  titleDropdown: string = 'Empresas';
  dateReport: string = '';
  description: string = '';
  inputDate!: string;
  DataCompany: Company = {
    empresa: '',
    representante: '',
    id: 0,
  };
  reports: Reporter[] = [];
  staff!: Workers;

  constructor(private reportService: ReporterService) {}

  SendDataonChange(event: any) {
    this.inputDate = event.target.value;
    this.preparingEndPoint();

  }
  selectListDescription(description: string) {}
  ngOnInit() {
    if (this.DataCompany) {
      this.getCurrentDate();
      this.preparingEndPoint();
    }
  }
  preparingEndPoint():void{
    const endPointID: number | undefined = this.DataCompany.id;
    const endPointDate: string = this.inputDate;

    const id: number = endPointID !== undefined ? endPointID : 0;
    const dataEndPoint = { endPointID: id, endPointDate: endPointDate };

    this.getData(dataEndPoint);
  }

  getCurrentDate() {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = ('0' + (hoy.getMonth() + 1)).slice(-2);
    const dia = ('0' + hoy.getDate()).slice(-2);

    this.inputDate = `${anio}-${mes}-${dia}`;
  }
  getData(endPoint: { endPointID: number; endPointDate: string }): void {
    this.reportService.getData(endPoint).subscribe(
      (data: Reporter[] ) => {
        if(data){
          data.forEach((element) => {
            this.reports.push(element);
          });
        }
      },
      (error: any) => {
        console.error('Error: ', error);
      }
    );
  }
}
