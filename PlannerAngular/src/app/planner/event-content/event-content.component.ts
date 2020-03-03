import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter, Input, destroyPlatform } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-event-content',
  templateUrl: './event-content.component.html',
  styleUrls: ['./event-content.component.less']
})

export class EventContentComponent implements OnInit {
  @Output() eventAdded = new EventEmitter();
  @Output() eventEdited = new EventEmitter();
  @Output() eventDeleted = new EventEmitter();
  @Output() modalClosed = new EventEmitter();

  @Input() inputEvent: CalendarEvent;
  @Input() isDelete: boolean;
  viewDate: Date = new Date();
  eventTemplate: CalendarEvent;

  // modalData: {
  //   action: string;
  //   event: CalendarEvent;
  // };

  dateFrom: Date;
  dateTo: Date;
  eventTitle: string;
  constructor() { }

  ngOnInit(): void {
    var today = new Date();
    this.eventTitle = this.inputEvent.title;
    this.dateFrom = this.inputEvent.start;
    this.dateTo = this.inputEvent.end;
    console.log(this.inputEvent);
    if (this.dateFrom.getDate() === today.getDate()) {
      this.dateFrom.setTime(today.getTime());
    }
  }

  addEvent(eventTitle: string, dateFrom: Date, dateTo: Date): void {
    this.eventTemplate =
    {
      title: eventTitle,
      start: dateFrom,
      end: dateTo,
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    };
    this.eventAdded.emit(this.eventTemplate);
  }

  editEvent(eventTitle: string, dateFrom: Date, dateTo: Date) {
    this.eventTemplate = this.inputEvent;
    this.eventTemplate.title = eventTitle;
    this.eventTemplate.start = dateFrom;
    this.eventTemplate.end = dateTo;
    this.eventEdited.emit(this.eventTemplate);
  }

  deleteEvent() {
    this.eventDeleted.emit(this.inputEvent);
  }

  closeModal(): void {
    this.modalClosed.emit(1);
  }
}
