import { Program } from "../categories/program.model";
import { Account } from "./account.model";

export class University {
  id!: number;
  account!: Account;
  name!: string;
  address?: string;
  phoneNumber?: string;
  programList!: Program[];
  
}