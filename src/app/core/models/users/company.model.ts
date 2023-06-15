import { Industry } from "../categories/industry.model";
import { Account } from "./account.model";

export class Company {
  id!: number;
  account!: Account;
  companyName!: string;
  companyDescription?: string;
  companyType?: string;
  companyAddress?: string;
  companyWebsite?: string;
  industryList!: Industry[];

  //id file
  companyLogo?: string;

  companyContactPersonTitle?: string;
  companyContactPersonName!: string;
  companyContactPersonEmail?: string;
  companyContactPersonDepartment?: string;
  companyContactPersonPhoneNumber?: string;
  
  
}