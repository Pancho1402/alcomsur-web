import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/dataService.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as QRCode from 'qrcode';

import { Workers } from 'src/app/model/workers.model';
import { ServiceQr } from 'src/app/service/register-qr.service';
import { ServiceCompany } from 'src/app/service/company.service';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.component.html',
  styleUrls: ['./generate-qr.component.css'],
})
export class GenerateQRComponent implements OnInit {
  qrCodeData: string = '';
  qrCodeImageUrl: string = '';
  staffData: Workers = {
    idEmpresa: 0,
    idTrabajador: 0,
    nombreEmpresa: '',
    nombre: '',
  };
  isValidateQR:boolean = false;

  constructor(
    private serviceQr: ServiceQr,
    private serviceCompany: ServiceCompany,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    if (this.staffData) {
      const dataRegister = {
        idTrabajador: this.staffData.idTrabajador,
        idEmpresa: this.staffData.idEmpresa,
      };
      this.postData(dataRegister);
    }
  }

  postData(dataRegister: { idTrabajador: number; idEmpresa: number }): void {
    this.serviceQr.postRegisterQR(dataRegister).subscribe(
      (data: string) => {
        this.qrCodeData = data;
        if (this.qrCodeData !== '') {
          this.generateQRCode();
          this.isValidateQR = true;
        }
        else{
          this.isValidateQR = false;
        }
      },
      (error: HttpErrorResponse | string) => {
        console.error('error: ', error);
      }
    );
  }

  private generateQRCode() {
    QRCode.toDataURL(this.qrCodeData)
      .then((url: string) => {
        this.qrCodeImageUrl = url;
      })
      .catch((error: string) => {
        console.error('Error generando el código QR:', error);
      });
  }

  downloadQRCode() {
    if (this.qrCodeData !== '') {
      const link = document.createElement('a');
      link.href = this.qrCodeImageUrl;

      link.download = `${this.staffData}-${this.staffData}.png`;
      link.click();
    }
  }
}
