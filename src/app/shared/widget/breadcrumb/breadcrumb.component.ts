import { Component, Input } from '@angular/core';
import { BreadCrumb } from 'src/app/core/models/common/breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadCrumbComponent {

  @Input() breadcrumb!: BreadCrumb;

}
