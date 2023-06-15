import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Industry } from 'src/app/core/models/categories/industry.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { Company } from 'src/app/core/models/users/company.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { AccountService } from 'src/app/core/services/management/account.service';
import { IndustryService } from 'src/app/core/services/management/categories/industry.service';
import { CompanyService } from 'src/app/core/services/management/users/company.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.scss']
})
export class FormCompanyComponent implements OnInit {

  @Input() modalData!: ModalData<Company>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // LANGUAGE
  langData: Record<string, Record<string, string>> = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';

  form!: FormGroup;
  listIndustry: Paginate<Industry> = new Paginate<Industry>();

  searchIndustryValueChanged = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private companyService: CompanyService,
    private industryService: IndustryService,
    private formValidatorService: FormValidatorService,
    private alert: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getDataIndustry();
    this.searchIndustryValueChanged.pipe(debounceTime(300))
    .subscribe(searchValue => {
      this.getDataIndustry(searchValue);
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        email: this.modalData.data?.account.email,
        password: this.modalData.data?.account.password,
        companyName: this.modalData.data?.companyName,
        companyDescription: this.modalData.data?.companyDescription,
        companyType: this.modalData.data?.companyType,
        companyAddress: this.modalData.data?.companyAddress,
        companyWebsite: this.modalData.data?.companyWebsite,
        industryList: this.modalData.data?.industryList.map(item => item.id),
        companyContactPersonTitle: this.modalData.data?.companyContactPersonTitle,
        companyContactPersonName: this.modalData.data?.companyContactPersonName,
        companyContactPersonEmail: this.modalData.data?.companyContactPersonEmail,
        companyContactPersonDepartment: this.modalData.data?.companyContactPersonDepartment,
        companyContactPersonPhoneNumber: this.modalData.data?.companyContactPersonPhoneNumber,
      });
    }
    this.form.get('password')?.removeValidators(Validators.required);
  }
  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      companyDescription: [''],
      companyType: [''],
      companyAddress: [''],
      companyWebsite: [''],
      industryList: [[], [Validators.required]],
      companyContactPersonTitle: [''],
      companyContactPersonName: ['', [Validators.required]],
      companyContactPersonEmail: [''],
      companyContactPersonDepartment: [''],
      companyContactPersonPhoneNumber: [''],
    })
  }

  getDataIndustry(searchValue?: string) {
    this.industryService.getAllPaging(0, 10, searchValue)
    .subscribe(res => {
      this.listIndustry.data = res.content.filter(x => x.status);
    })
  }

  onCancel() {
    this.closeModal.emit(true);
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.companyService.update(this.form.value, this.modalData.data?.id!)
        .subscribe(() => {
          this.closeModal.emit(true);
          this.alert.success(this.langData[this.langCode]['MSG_UPDATE_DONE']);
        },
        () => {
          this.alert.error(this.langData[this.langCode]['ERR_SYSTEM']);
        });
      } else {
        this.accountService.createCompany(this.form.value)
        .subscribe(() => {
          this.closeModal.emit(true);
          this.alert.success(this.langData[this.langCode]['MSG_CREATE_DONE']);
        },
        () => {
          this.alert.error(this.langData[this.langCode]['ERR_SYSTEM']);
        })
      }
    } else {
      this.formValidatorService.validateAllFormFields(this.form);
    }
  }

  isFieldValid = this.formValidatorService.isFieldValid;
  displayFieldCss = this.formValidatorService.displayFieldCss;
}
