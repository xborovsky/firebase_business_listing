import { CompanyListItem } from './../company-list-item';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { CompanyService } from './../company.service';
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Company } from 'app/company';
import { Address } from 'app/address';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit, OnDestroy {
  @Input() companyIdSubject:Subject<string>;
  company:Company;
  form:FormGroup;
  @Output('closeEdit')
  closeEditEmitter = new EventEmitter<void>();
  @Output()
  companyEdited = new EventEmitter();

  constructor(private companyService:CompanyService, private fb:FormBuilder) {
    this.form = fb.group({
      company : new FormControl('', Validators.required),
      category : new FormControl('', Validators.required),
      years : new FormControl('', Validators.required),
      description : new FormControl(''),
      phone : new FormControl('', Validators.compose([Validators.required, Validators.pattern('^\[+]?[()/0-9. -]{9,}$')])),
      email : new FormControl('', Validators.pattern('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')),
      street : new FormControl(''),
      city : new FormControl(''),
      state : new FormControl(''),
      zipCode : new FormControl('', Validators.pattern('[A-Za-z]{5}'))
    });
  }

  ngOnInit() {
    this.companyIdSubject.subscribe((companyId:string) => {
      this.companyService.getCompany(companyId).then(company => {
        if (company && company.val()) {
          this.company = company.val().company;
          this.company.detail.id = companyId;

          this.form.controls['company'].setValue(this.company.detail.name);
          this.form.controls['category'].setValue(this.company.detail.category);
          this.form.controls['years'].setValue(this.company.years);
          this.form.controls['description'].setValue(this.company.description);
          this.form.controls['phone'].setValue(this.company.detail.phone);
          this.form.controls['email'].setValue(this.company.email);
          this.form.controls['street'].setValue(this.company.address.street);
          this.form.controls['city'].setValue(this.company.address.city);
          this.form.controls['state'].setValue(this.company.address.state);
          this.form.controls['zipCode'].setValue(this.company.address.zipCode);
        } else {
          this.company = null;
        }
      });
    });
  }

  ngOnDestroy() {
    this.companyIdSubject.unsubscribe();
  }

  onSubmit(event) {
    let detail = new CompanyListItem(
      this.company.detail.id,
      this.form.value.company,
      this.form.value.category,
      this.form.value.phone
    );
    let address = new Address(
      this.form.value.street,
      this.form.value.city,
      this.form.value.state,
      this.form.value.zipCode
    );
    let company = new Company(detail, address, this.form.value.email, this.form.value.description, this.form.value.years);
    this.companyService.updateCompany(company);
    this.companyEdited.emit(event);
  }

  closeEdit() {
    this.closeEditEmitter.emit();
  }

}
