import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';
import { ModalData } from 'src/app/core/models/common/modal-data.model';
import { University } from 'src/app/core/models/users/university.model';
import { AccountService } from 'src/app/core/services/management/account.service';
import { UniversityService } from 'src/app/core/services/management/users/university.service';
import { Paginate } from 'src/app/shared/widget/paginate/paginate.model';

@Component({
  selector: 'app-list-university',
  templateUrl: './list-university.component.html',
  styleUrls: ['./list-university.component.scss']
})
export class ListUniversityComponent implements OnInit {

  // LANGUAGE
  langData: Record<string, Record<string, string>> = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';

  breadcrumObj: BreadCrumb = new BreadCrumb({
    heading: this.langData[this.langCode]['UNIVERSITY'],
    listBreadcrumb: [{
      title: this.langData[this.langCode]['USER_ACCOUNT'],
      link: UrlConstant.ROUTE.MANAGEMENT.USER_ACCOUNT
    }]
  });

  modalData: ModalData<University> = new ModalData<University>();
  listUniversity: Paginate<University> = new Paginate<University>();
  searchValue = '';

  constructor (
    private universityService: UniversityService,
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
      this.listUniversity.currentPage = 1;
    }
    this.spinner.show();
    this.universityService.getAllPaging(
      this.listUniversity.currentPage - 1,
      this.listUniversity.limit,
      this.searchValue
    ).subscribe(res => {
      this.listUniversity.currentPage = res.pageable.pageNumber + 1;
      this.listUniversity.limit = res.pageable.pageSize;
      this.listUniversity.totalPage = res.totalPages;
      this.listUniversity.totalItem = res.totalElements;
      this.listUniversity.data = res.content;
    }, () => this.spinner.hide());
  }

  openModal(template: TemplateRef<any>, data?: University) {
    if (data) {
      this.modalData.action = SystemConstant.ACTION.EDIT;
      this.modalData.data = data;
    } else {
      this.modalData.action = SystemConstant.ACTION.ADD;
    }

    this.nzModalService.create({
      nzStyle: {top: '20px'},
      nzWidth: 500,
      nzTitle: (data?.id ? this.langData[this.langCode]['EDIT_TITLE'] : this.langData[this.langCode]['ADD_TITLE']) + this.langData[this.langCode]['COMPANY'],
      nzContent: template,
      nzFooter: null,
      nzMaskClosable: false
    });
  }

  closeModal(reload?: boolean) {
    if (reload) {
      this.listUniversity.currentPage = 1;
      this.getDataPaging();
    }
    this.nzModalService.closeAll()
  }

  pageChange(page: Paginate<University>) {
    this.listUniversity = page;
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

  delete(id: number) {
    this.nzModalService.confirm({
      nzTitle: this.langData[this.langCode]['CONFIRM_DELETE'],
      nzCancelText: this.langData[this.langCode]['CANCEL'],
      nzOkText: this.langData[this.langCode]['CONFIRM'],
      nzOkDanger: true,
      nzOnOk: () => {
        this.spinner.show();
        this.universityService.delete(id)
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
