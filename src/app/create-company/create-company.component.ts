import { CompanyListItem } from './../company-list-item';
import { CompanyService } from './../company.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import { Address } from 'app/address';
import { Company } from 'app/company';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent {
  @Output() companyCreated = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder, private companyService:CompanyService) {
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

  onSubmit(event) {
    let detail = new CompanyListItem(
      null,
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
    let company = 
    this.companyService.create(new Company(
      detail, address, this.form.value.email,
      this.form.value.description, this.form.value.years
    )); // TODO success response?
    this.companyCreated.emit(event);
  }

}
