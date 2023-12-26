import { Component, OnInit } from '@angular/core';
import { Workers } from 'src/app/model/workers.model';
import { ServiceCompany } from 'src/app/service/company.service';
import { DataService } from 'src/app/service/dataService.service';
import { Company } from 'src/app/model/company.model';
import { CheckInService } from 'src/app/service/checkIn.service';
import { ICheckIn } from 'src/app/model/ckeckIn.model';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
})
export class CheckInComponent implements OnInit {
  titleDropdown: string = 'Empresas';
  companies: Company[] = [];
  inputDate!: string;
  inputData: ICheckIn[] = [];
  todayDate!: string;
  contCurrentPage: number = 0;
  limitPage: number = 5;
  totalStaff: number = 0;
  contPages: number = 1;

  constructor(
    private companyService: ServiceCompany,
    private dataService: DataService,
    private checkService: CheckInService
  ) {}

  SendDataonChange(event: any) {
    this.inputDate = event.target.value;
    this.preparingEndPoint();
  }
  SelectDelete(id: number | undefined): void {}

  ngOnInit(): void {
    const today = new Date();

    this.dataService.dataOutput.subscribe((data) => {
      this.titleDropdown = data.company;

      if (this.inputDate == undefined) {
        this.inputDate = '';
      }

      this.preparingEndPoint();
    });
    this.getData();
  }
  getData(): void {
    this.companyService.getData().subscribe(
      (data: Company[]) => {
        data.forEach((element) => {
          this.companies.push(element);
        });
      },
      (error: any) => {}
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

  getCheckIn(endpoint: {
    endPointCompany: string | null;
    endPointDate: string | null;
  }) {
    this.inputData = [];
    this.checkService.getData(endpoint).subscribe(
      (data: ICheckIn[]) => {
        if (data) {
          this.totalStaff = data.length;
          data.forEach((element) => {
            this.inputData.push(element);
          });
        }
      },
      (error: any) => {
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
    const totalPages = Math.ceil(this.inputData.length / this.limitPage);
    if (this.contCurrentPage < totalPages - 1) {
      this.contCurrentPage++;
    }
  }
  indexArray(entryData: ICheckIn): number {
    return this.inputData.findIndex((element) => element === entryData);
  }
}
