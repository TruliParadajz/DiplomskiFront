import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import { PlannerViewComponent } from './planner-view/planner-view.component';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool
import { FlatpickrModule } from 'angularx-flatpickr';
import { ContextMenuModule } from 'ngx-contextmenu';

@NgModule({
  declarations: [PlannerViewComponent],
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule,
    ContextMenuModule.forRoot({useBootstrap4: true})
  ],
  exports : [
    PlannerViewComponent    
  ]
})
export class PlannerModule { }