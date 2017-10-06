import { Address } from './address';
import { CompanyListItem } from './company-list-item';

export class Company {
    constructor(
        public detail:CompanyListItem,
        public address:Address,
        public email:string,
        public description:string,
        public years:number
    ) {}
}
