import { Subject } from 'rxjs/Subject';
import { CompanyService } from './../company.service';
import { CompanyListItem } from './../company-list-item';
import { Company } from './../company';
import { Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies : CompanyListItem[] = [];
  showNew = false;
  showDetail = false;
  showEdit = false;
  showCreatedNewSuccessMsg = false;
  selectedCompanyId:Subject<string> = new Subject();

  constructor(private companyService:CompanyService) { }

  ngOnInit() {
    this.loadCompanies();
  }

  toggleShowNew() {
    this.showNew = !this.showNew;
  }

  toggleShowDetail(id:string) {
    this.showDetail = true;
    this.selectedCompanyId.next(id);
  }

  toggleShowEdit(id:string) {
    this.showEdit = true;
  }

  onCloseDetail() {
    this.showDetail = false;
  }

  onCloseEdit() {
    this.showEdit = false;
  }

  editCompany(id:number) {}

  deleteCompany(id:string) {
    if (confirm('Do you really want to delete the selected item?')) {
      this.companyService.delete(id);
      this.loadCompanies();
    }
  }

  onCompanyCreated(event) {
    this.showCreatedNewSuccessMsg = true;
    this.showNew = false;
    setTimeout(() => {
      this.showCreatedNewSuccessMsg = false;
    }, 3000);
    this.loadCompanies();
  }

  private loadCompanies():void {
    this.companies = [];
    this.companyService.listAll()
    .subscribe((companies) => { // TODO somehow better with rxjs??
      companies.forEach((company) => {
        let item:CompanyListItem = company['company']['detail'];
        item.id = company['id'];
        this.companies.push(item);
      });
    });
  }

}
