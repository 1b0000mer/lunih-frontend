import { Program } from "../categories/program.model";
import { Account } from "./account.model";

export class Student {
  studentID!: string;
  account!: Account;
  firstName!: string;
  surName!: string;
  birthDay?: Date;
  gender?: string;
  phoneNumber?: string;
  
  //id file
  fileCertification?: string;
  approved!: boolean;
  reason?: string;

  program!: Program;
}