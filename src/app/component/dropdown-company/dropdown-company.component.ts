import { Component, Input} from '@angular/core';
import { Company } from 'src/app/model/company.model';
import { ServiceCompany } from 'src/app/service/company.service';
import { DataService } from 'src/app/service/dataService.service';

@Component({
  selector: 'app-dropdown-company',
  templateUrl: './dropdown-company.component.html',
  styleUrls: ['./dropdown-company.component.css']
})
export class DropdownCompanyComponent{
  
  @Input()companies!: Company;
  constructor(
    private dataService:DataService
    ){}

  selectCompany(company: string , id:number | undefined) {
    this.dataService.dataOutput.emit({ company, id });
  }
  

}
