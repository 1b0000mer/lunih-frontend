import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Program } from 'src/app/core/models/categories/program.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { University } from 'src/app/core/models/users/university.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { AccountService } from 'src/app/core/services/management/account.service';
import { ProgramService } from 'src/app/core/services/management/categories/program.service';
import { UniversityService } from 'src/app/core/services/management/users/university.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-form-university',
  templateUrl: './form-university.component.html',
  styleUrls: ['./form-university.component.scss']
})
export class FormUniversityComponent implements OnInit {

  @Input() modalData!: ModalData<University>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // LANGUAGE
  langData: Record<string, Record<string, string>> = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';

  form!: FormGroup;
  listProgram: Paginate<Program> = new Paginate<Program>();

  searchProgramValueChanged = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private universityService: UniversityService,
    private programService: ProgramService,
    private formValidatorService: FormValidatorService,
    private alert: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getDataProgram();
    this.searchProgramValueChanged.pipe(debounceTime(300))
    .subscribe(searchValue => {
      this.getDataProgram(searchValue);
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.form.patchValue({
        email: this.modalData.data?.account.email,
        password: this.modalData.data?.account.password,
        name: this.modalData.data?.name,
        address: this.modalData.data?.address,
        phoneNumber: this.modalData.data?.phoneNumber,
        programList: this.modalData.data?.programList.map(item => item.id),
      });
    }
    this.form.get('password')?.removeValidators(Validators.required);
  }
  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: [''],
      phoneNumber: [''],
      programList: [[], [Validators.required]],
    })
  }

  getDataProgram(searchValue?: string) {
    this.programService.getAllPaging(0, 10, searchValue)
    .subscribe(res => {
      this.listProgram.data = res.content.filter(x => x.status);
    })
  }

  onCancel() {
    this.closeModal.emit(true);
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.universityService.update(this.form.value, this.modalData.data?.id!)
        .subscribe(() => {
          this.closeModal.emit(true);
          this.alert.success(this.langData[this.langCode]['MSG_UPDATE_DONE']);
        },
        () => {
          this.alert.error(this.langData[this.langCode]['ERR_SYSTEM']);
        });
      } else {
        this.accountService.createUniversity(this.form.value)
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
