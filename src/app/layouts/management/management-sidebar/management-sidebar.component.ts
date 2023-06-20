import { Component, OnInit } from '@angular/core';
import { LanguageConstant } from 'src/app/core/constants/language.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';

@Component({
  selector: 'app-management-sidebar',
  templateUrl: './management-sidebar.component.html',
  styleUrls: ['./management-sidebar.component.scss']
})
export class ManagementSidebarComponent implements OnInit {

  // LANGUAGE
  langData: Record<string, Record<string, string>> = LanguageConstant;
  langCode = localStorage.getItem('language') ?? 'en';
  
  userName = 'John Evans';

  listMenu: {
    icon: string;
    title: string;
    routerLink: string;
    isHaveChild: boolean;
    listChild: {
      icon: string;
      title: string;
      routerLink: string;
    }[];
  }[] = [];

  ngOnInit(): void {
    this.listMenu = [
      //dashboard
      {
        icon: 'fas fa-solar-panel',
        title: this.langData[this.langCode]['DASHBOARD'],
        routerLink: UrlConstant.ROUTE.MANAGEMENT.DASHBOARD,
        isHaveChild: false,
        listChild: []
      },

      //categories
      {
        icon: 'pic-left',
        title: this.langData[this.langCode]['CATEGORIES'],
        routerLink: '',
        isHaveChild: true,
        listChild: [
          {
            icon: 'fas fa-university',
            title: this.langData[this.langCode]['FACULTY'],
            routerLink: UrlConstant.ROUTE.MANAGEMENT.FACULTY
          },
          {
            icon: 'fas fa-tshirt',
            title: this.langData[this.langCode]['PROGRAM'],
            routerLink: UrlConstant.ROUTE.MANAGEMENT.PROGRAM
          },
          {
            icon: '',
            title: this.langData[this.langCode]['INDUSTRY'],
            routerLink: UrlConstant.ROUTE.MANAGEMENT.INDUSTRY
          },
          {
            icon: '',
            title: this.langData[this.langCode]['POST_TYPE'],
            routerLink: UrlConstant.ROUTE.MANAGEMENT.POST_TYPE
          },
        ]
      },

      //user_account
      {
        icon: '',
        title: this.langData[this.langCode]['USER_ACCOUNT'],
        routerLink: '',
        isHaveChild: true,
        listChild: [
          {
            icon: '',
            title: this.langData[this.langCode]['STUDENT'],
            routerLink: UrlConstant.ROUTE.MANAGEMENT.STUDENT
          },
          {
            icon: '',
            title: this.langData[this.langCode]['APPROVE_STUDENT'],
            routerLink: UrlConstant.ROUTE.MANAGEMENT.APPROVE_STUDENT
          },
          {
            icon: '',
            title: this.langData[this.langCode]['UNIVERSITY'],
            routerLink: UrlConstant.ROUTE.MANAGEMENT.UNIVERSITY
          },
          {
            icon: '',
            title: this.langData[this.langCode]['COMPANY'],
            routerLink: UrlConstant.ROUTE.MANAGEMENT.COMPANY
          },
          {
            icon: '',
            title: this.langData[this.langCode]['ADMIN'],
            routerLink: UrlConstant.ROUTE.MANAGEMENT.ADMIN
          },
        ]
      },

      //post_management
      {
        icon: '',
        title: this.langData[this.langCode]['POST_MANAGEMENT'],
        routerLink: '',
        isHaveChild: true,
        listChild: [
          {
            icon: '',
            title: this.langData[this.langCode]['POST'],
            routerLink: UrlConstant.ROUTE.MANAGEMENT.POST_MANAGEMENT,
          }
        ]
      }
      
    ]
    
  }

}
