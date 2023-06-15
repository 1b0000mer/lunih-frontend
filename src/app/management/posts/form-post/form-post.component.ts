import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Industry } from 'src/app/core/models/categories/industry.model';
import { PostType } from 'src/app/core/models/categories/post-type.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { Deliverable } from 'src/app/core/models/deliverable.model';
import { Post } from 'src/app/core/models/post.model';
import { Account } from 'src/app/core/models/users/account.model';
import { Student } from 'src/app/core/models/users/student.model';
import { FormValidatorService } from 'src/app/core/services/common/form-validator.service';
import { AccountService } from 'src/app/core/services/management/account.service';
import { IndustryService } from 'src/app/core/services/management/categories/industry.service';
import { PostTypeService } from 'src/app/core/services/management/categories/post-type.service';
import { DeliverableService } from 'src/app/core/services/management/deliverable.service';
import { PostService } from 'src/app/core/services/management/post.service';
import { StudentService } from 'src/app/core/services/management/users/student.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrls: ['./form-post.component.scss']
})
export class FormPostComponent implements OnInit{

  @Input() modalData!: ModalData<Post>;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  // LANGUAGE
  langData: Record<string, Record<string, string>> = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';

  form!: FormGroup;

  listIndustry: Paginate<Industry> = new Paginate<Industry>();
  listPostType!: PostType[];
  listDeliverable!: Deliverable[];
  listAccount: Paginate<Account> = new Paginate<Account>();
  listStudent: Paginate<Student> = new Paginate<Student>();

  // Search params
  searchIndustryValueChanged = new Subject<string>();
  searchAccountValueChanged = new Subject<string>();
  searchStudentValueChanged = new Subject<string>();

  constructor(
    private postService: PostService,
    private industryService: IndustryService,
    private postTypeService: PostTypeService,
    private deliverableService: DeliverableService,
    private accountService: AccountService,
    private studentService: StudentService,
    private fb: FormBuilder,
    private formValidatorService: FormValidatorService,
    private alert: ToastrService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getDataPostType();
    this.getDataDeliverable();
    this.searchIndustryValueChanged.pipe(debounceTime(300))
    .subscribe(searchValue => {
      this.getDataIndustry(searchValue);
    });
    this.searchAccountValueChanged.pipe(debounceTime(300))
    .subscribe(searchValue => {
      this.getDataAccount(searchValue);
    });
    this.searchStudentValueChanged.pipe(debounceTime(300))
    .subscribe(searchValue => {
      this.getDataStudent(searchValue);
    });
    if (this.modalData.action === SystemConstant.ACTION.EDIT) {
      this.listIndustry.data = [...this.modalData.data?.industryList!];
      this.listStudent.data = [...this.modalData.data?.studentList!];
      this.listDeliverable = [...this.modalData.data?.deliverables!];
      this.form.patchValue({
        postType: this.modalData.data?.postType.id,
        titleEn: this.modalData.data?.titleEn,
        titleLv: this.modalData.data?.titleLv,
        descriptionEn: this.modalData.data?.descriptionEn,
        descriptionLv: this.modalData.data?.descriptionEn,
        industryList: this.modalData.data?.industryList.map(item => item.id),
        startDate: new Date(this.modalData.data?.startDate!),
        endDate: new Date(this.modalData.data?.endDate!),
        numSlot: this.modalData.data?.numSlot,
        studentList: this.modalData.data?.studentList?.map(x => x.studentID),
        queueList: this.modalData.data?.queueList?.map(x => x.studentID),
        leader: this.modalData.data?.leader?.studentID,
        deliverables: this.modalData.data?.deliverables?.map(x => x.id),
        author: this.modalData.data?.author?.id,
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      postType: [0, [Validators.required]],
      titleEn: ['', [Validators.required]],
      titleLv: ['', [Validators.required]],
      descriptionEn: ['', [Validators.required]],
      descriptionLv: ['', [Validators.required]],
      industryList: [[], [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      numSlot: [0, [Validators.required]],
      studentList: [[]],
      queueList: [[]],
      leader: [''],
      deliverables: [[]],
      author: [-1],
    })
  }

  getDataIndustry(searchValue?: string) {
    this.industryService.getAllPaging(0, 10, searchValue)
    .subscribe(res => {
      this.listIndustry.data = res.content.filter(x => x.status);
    })
  }

  getDataPostType() {
    this.postTypeService.getAll()
    .subscribe(res => {
      this.listPostType = res.filter(x => x.status);
    })
  }

  getDataDeliverable() {
    this.deliverableService.getAll()
    .subscribe(res => {
      this.listDeliverable = res;
    })
  }

  getDataAccount(searchValue?: string) {
    this.accountService.getAllPaging(0, 10, searchValue)
    .subscribe(res => {
      this.listAccount.data = res.content.filter(x => x.status);
    })
  }

  getDataStudent(searchValue?: string) {
    this.studentService.getAllPaging(0, 10, searchValue)
    .subscribe(res => {
      // no filter approved for now
      this.listStudent.data = res.content;
    })
  }

  onCancel() {
    this.closeModal.emit(false);
  }

  onSubmit(){
    if (this.form.valid) {
      if (this.modalData.action === SystemConstant.ACTION.EDIT) {
        this.postService.update(this.form.value, this.modalData.data?.id!)
        .subscribe(() => {
          this.closeModal.emit(true);
          this.alert.success(this.langData[this.langCode]['MSG_UPDATE_DONE']);
        },
        () => {
          this.alert.error(this.langData[this.langCode]['ERR_SYSTEM']);
        });
      } else {
        this.postService.create(this.form.value)
        .subscribe(() => {
          this.closeModal.emit(true);
          this.alert.success(this.langData[this.langCode]['MSG_CREATE_DONE']);
        },
        () => {
          this.alert.error(this.langData[this.langCode]['ERR_SYSTEM']);
        });
      }
    } else {
      this.formValidatorService.validateAllFormFields(this.form);
    }
  }

  isFieldValid = this.formValidatorService.isFieldValid;
  displayFieldCss = this.formValidatorService.displayFieldCss;
}
