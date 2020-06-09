import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, CalendarNativeDateFormatter, DateFormatterParams } from 'angular-calendar';
import { PlannerViewComponent } from './planner-view/planner-view.component';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { plannerRoutingModule } from './planner.routing'

import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool
import { FlatpickrModule } from 'angularx-flatpickr';
import { ContextMenuModule } from 'ngx-contextmenu';
import { EventContentComponent } from './event-content/event-content.component';
import { ListViewComponent } from './list-view/list-view.component';
import { MatTableModule } from '@angular/material/table';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CustomDateFormat, CustomCompletedFormat } from '@app/_pipes';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'

@NgModule({
  declarations: [PlannerViewComponent,
    EventContentComponent,
    ListViewComponent,
    CustomDateFormat,
    CustomCompletedFormat
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CalendarModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule,
    ContextMenuModule.forRoot({ useBootstrap4: true }),
    plannerRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  exports: [
    PlannerViewComponent,
    ListViewComponent
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class PlannerModule { }