import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDividerModule } from 'ng-zorro-antd/divider';

// import { } from 'ng-zorro-antd/';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// Zorro
const NgZorroAntdModules = [
  NzFormModule,
  NzDividerModule,
  NzCarouselModule,
  NzGridModule,
  NzLayoutModule,
  NzCheckboxModule,
  NzEmptyModule,
  NzButtonModule,
  NzModalModule,
  NzDropDownModule,
  NzDatePickerModule,
  NzInputModule,
  NzSelectModule,
  NzPopoverModule,
  NzTableModule,
  NzTagModule,
  NzToolTipModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModules,
    NgxSpinnerModule,
    // CKEditorModule,
  ],
  exports: [
    NgZorroAntdModules,
    NgxSpinnerModule,
    // CKEditorModule,
  ],
  providers: []
})
export class PluginModule { }