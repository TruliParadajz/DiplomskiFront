import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAdapter, CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PlannerViewComponent } from './planner-view/planner-view.component';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';

@NgModule({
  declarations: [PlannerViewComponent],
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule
  ],
  exports : [
    PlannerViewComponent
  ]
})
export class PlannerModule { }