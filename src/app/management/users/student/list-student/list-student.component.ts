import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { Student } from 'src/app/core/models/users/student.model';
import { AccountService } from 'src/app/core/services/management/account.service';
import { StudentService } from 'src/app/core/services/management/users/student.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {

  // LANGUAGE
  langData: Record<string, Record<string, string>> = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';

  breadcrumObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode]['STUDENT'],
    listBreadcrumb: [{
      title: this.langData[this.langCode]['USER_ACCOUNT'],
      link: UrlConstant.ROUTE.MANAGEMENT.USER_ACCOUNT
    }]
  });

  modalData: ModalData<Student> = new ModalData<Student>();
  listStudent: Paginate<Student> = new Paginate<Student>();
  searchValue = '';

  constructor (
    private studentService: StudentService,
    private accountService: AccountService,
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    private nzModalService: NzModalService,
  ) { }

  ngOnInit(): void {
    this.getDataPaging();
  }

  getDataPaging(isSearch?: boolean) {
    if (isSearch) {
      this.listStudent.currentPage = 1;
    }
    this.spinner.show();
    this.studentService.getAllPaging(
      this.listStudent.currentPage - 1,
      this.listStudent.limit,
      this.searchValue
    ).subscribe(res => {
      this.listStudent.currentPage = res.pageable.pageNumber + 1;
      this.listStudent.limit = res.pageable.pageSize;
      this.listStudent.totalPage = res.totalPages;
      this.listStudent.totalItem = res.totalElements;
      this.listStudent.data = res.content;
    }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<any>, data?: Student) {
    if (data) {
      this.modalData.action = SystemConstant.ACTION.EDIT;
      this.modalData.data = data;
    } else {
      this.modalData.action = SystemConstant.ACTION.ADD;
    }

    this.nzModalService.create({
      nzStyle: {top: '20px'},
      nzWidth: 500,
      nzTitle: (data?.studentID ? this.langData[this.langCode]['EDIT_TITLE'] : this.langData[this.langCode]['ADD_TITLE']) + this.langData[this.langCode]['STUDENT'],
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModal(reload?: boolean) {
    if (reload) {
      this.listStudent.currentPage = 1;
      this.getDataPaging();
    }
    this.nzModalService.closeAll()
  }

  pageChange(page: Paginate<Student>) {
    this.listStudent = page;
    this.getDataPaging();
  }

  changeStatus(id: number) {
    this.nzModalService.confirm({
      nzTitle: this.langData[this.langCode]['CONFIRM_CHANGE_STATUS'],
      nzCancelText: this.langData[this.langCode]['CANCEL'],
      nzOkText: this.langData[this.langCode]['CONFIRM'],
      nzOkDanger: true,
      nzOnOk: () => {
        this.spinner.show();
        this.accountService.changeStatus(id)
        .subscribe(() => {
          this.alert.success(this.langData[this.langCode]['MSG_CHANGE_DONE']);
          this.closeModal(true);
          this.spinner.hide();
        },
        () => this.spinner.hide());
      }
    })
  }

  delete(studentID: string) {
    this.nzModalService.confirm({
      nzTitle: this.langData[this.langCode]['CONFIRM_DELETE'],
      nzCancelText: this.langData[this.langCode]['CANCEL'],
      nzOkText: this.langData[this.langCode]['CONFIRM'],
      nzOkDanger: true,
      nzOnOk: () => {
        this.spinner.show();
        this.studentService.delete(studentID)
        .subscribe(() => {
          this.alert.success(this.langData[this.langCode]['MSG_CHANGE_DONE']);
          this.closeModal(true);
          this.spinner.hide();
        },
        () => {
          this.spinner.hide()
        });
      }
    })
  }

}
