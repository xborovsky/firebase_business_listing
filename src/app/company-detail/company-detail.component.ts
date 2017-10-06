import { CompanyService } from './../company.service';
import { Company } from './../company';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit, OnDestroy {
  @Input() companyIdSubject:Subject<string>;
  @Output('closeDetail')
  closeDetailEmitter = new EventEmitter<void>();
  company:Company;

  constructor(private companyService:CompanyService) { }

  ngOnInit() {
    this.companyIdSubject.subscribe((companyId:string) => {
      this.companyService.getCompany(companyId).then(company => {
        if (company && company.val()) {
          this.company = company.val().company;
        } else {
          this.company = null;
        }
      });
    });
  }

  ngOnDestroy() {
    this.companyIdSubject.unsubscribe();
  }

  closeDetail() {
    this.closeDetailEmitter.emit();
  }

}
