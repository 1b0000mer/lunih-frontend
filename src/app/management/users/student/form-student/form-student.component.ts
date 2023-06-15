import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Program } from 'src/app/core/models/categories/program.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { Student } from 'src/app/core/models/users/student.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { AccountService } from 'src/app/core/services/management/account.service';
import { ProgramService } from 'src/app/core/services/management/categories/program.service';
import { StudentService } from 'src/app/core/services/management/users/student.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.scss']
})
export class FormStudentComponent implements OnInit {

  @Input() modalData!: ModalData<Student>;
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
    private studentService: StudentService,
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
        studentID: this.modalData.data?.studentID,
        firstName: this.modalData.data?.firstName,
        surName: this.modalData.data?.surName,
        program: this.modalData.data?.program.id,
        birthDay: new Date(this.modalData.data?.birthDay!),
        gender: this.modalData.data?.gender,
        phoneNumber: this.modalData.data?.phoneNumber
      });
      this.form.get('studentID')?.disable();
      this.form.get('password')?.removeValidators(Validators.required);
    }
  }
  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      studentID: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      surName: ['', [Validators.required]],
      program: [-1, [Validators.required]],
      birthDay: [''],
      gender: [''],
      phoneNumber: ['']
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
        this.studentService.update(this.form.value, this.modalData.data?.studentID!)
        .subscribe(() => {
          this.closeModal.emit(true);
          this.alert.success(this.langData[this.langCode]['MSG_UPDATE_DONE']);
        },
        () => {
          this.alert.error(this.langData[this.langCode]['ERR_SYSTEM']);
        });
      } else {
        this.accountService.createStudent(this.form.value)
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
