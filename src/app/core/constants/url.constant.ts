import { environment } from 'src/environments/environment';

export const UrlConstant = {
  PUBLIC_URL: [
    { regex: '.*login.*', method: 'POST' },
    { regex: '.*banner$', method: 'GET' },
    { regex: '.*banner/[a-fA-f0-9]{24}', method: 'GET' }, // banner/{id}
    { regex: '.*side-banner$', method: 'GET' },
    { regex: '.*side-banner/[a-fA-f0-9]{24}', method: 'GET' }, // banner/{id}
    { regex: '.*post/paging', method: 'GET' },
    { regex: '.*post-type', method: 'GET' },
    { regex: '.*post/[a-fA-f0-9]{24}', method: 'GET' }, // post/{id}
    { regex: '.*file.*', method: 'GET' },
  ],

  API: {
    // Main
    LOGIN: environment.serverUrl + 'rest/login',

    // Categories
    FACULTY: environment.serverUrl + 'rest/faculty',
    INDUSTRY: environment.serverUrl + 'rest/industry',
    POST_TYPE: environment.serverUrl + 'rest/post-type',
    PROGRAM: environment.serverUrl + 'rest/program',

    // User_account
    STUDENT: environment.serverUrl + 'rest/student',
    UNIVERSITY: environment.serverUrl + 'rest/university',
    COMPANY: environment.serverUrl + 'rest/company',
    ADMIN: environment.serverUrl + 'rest/admin',
    ACCOUNT: environment.serverUrl + 'rest/account',

    // Post
    POST: environment.serverUrl + 'rest/post',
    DELIVERABLE: environment.serverUrl + 'rest/deliverable'
  },

  ROUTE: {
    LOGIN: '/login',
    MAIN: {
      HOME: '/',
    },

    MANAGEMENT: {
      MANAGEMENT: '/management',
      DASHBOARD: '/management/dashboard',

      USER_ACCOUNT: '/management/users',
      STUDENT: '/management/users/student',
      APPROVE_STUDENT: '/management/users/student/approve',
      UNIVERSITY: '/management/users/university',
      COMPANY: '/management/users/company',
      ADMIN: '/management/users/admin',
      
      CATEGORIES: '/management/categories',
      FACULTY: '/management/categories/faculty',
      INDUSTRY: '/management/categories/industry',
      PROGRAM: '/management/categories/program',
      POST_TYPE: '/management/categories/post-type',

      POST_MANAGEMENT: '/management/posts',

    },


  },
};
