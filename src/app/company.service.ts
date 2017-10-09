import { Company } from './company';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class CompanyService {

  constructor(private http:Http, private af:AngularFireDatabase) { }

  listAll():FirebaseListObservable<any[]> {
    return this.af.list('companies');
  }

  create(company:Company) {
    let ref = this.af.database.ref('companies');
    let newRef = ref.push();
    newRef.set({
      id : newRef.key,
      company: company
    });
  }

  getCompany(id:string):any {
    return this.af.database.ref('companies/' + id).once('value');
  }

  delete(id:string) {
    return this.af.database.ref('companies/' + id).remove();
  }

  updateCompany(company:Company) {
    console.log(company);
    this.af.database.ref('companies/' + company.detail.id + '/company').update(company);
  }

}
