import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import { PlannerViewComponent } from './planner-view/planner-view.component';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import {ShContextMenuModule} from 'ng2-right-click-menu'

@NgModule({
  declarations: [PlannerViewComponent],
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule,
    ShContextMenuModule
  ],
  exports : [
    PlannerViewComponent
  ]
})
export class PlannerModule { }