import {
  Component,
  ViewChild,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject, BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarDateFormatter,
  CalendarMonthViewDay
} from 'angular-calendar';

import { ContextMenuComponent } from 'ngx-contextmenu';
import { EventTaskServiceService } from '../event-task-service.service';
import { User, EventTaskInput } from '@app/_models';
import { DayTimeFormatter } from './custom-day-format.provider';

@Component({
  selector: 'app-planner-view',
  templateUrl: './planner-view.component.html',
  styleUrls: ['./planner-view.component.less'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: DayTimeFormatter,
    },
  ],
  encapsulation: ViewEncapsulation.None
})

// Code
export class PlannerViewComponent {
  @ViewChild(ContextMenuComponent, { static: true }) public basicMenu: ContextMenuComponent;

  @ViewChild('eventContent', { static: true }) eventContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  inputEvent: EventTaskInput;
  //Bool value for delete content
  isDelete: boolean = false;;
  isComplete: boolean = false;

  weekStartsOn = "1";

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.editEvent(event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-check"></i>',
      a11yLabel: 'Complete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.completeEvent(event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[];
  eventList: EventTaskInput[];

  currentUserSubject: BehaviorSubject<User>;

  ngOnInit() {
    this.eventTaskService.getEventTasks(this.currentUserSubject.value.id)
      .subscribe((res: EventTaskInput[]) => {
        this.eventList = res;

        let newList: CalendarEvent[] = [];
        res.forEach(element => {
          newList.push(this.convertToCalendarEvent(element))
        })

        this.events = newList;
        this.events.forEach(element => {

          element.actions = this.actions
        });
      });

  }
  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal,
    private eventTaskService: EventTaskServiceService) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.editEvent(event);
  }
  eventAdded(newEventData: EventTaskInput): void {
    this.eventTaskService.addEventTask(newEventData).subscribe(result => {

      if (this.eventList == null) {
        this.eventList = [result];
      }
      else {
        this.eventList = [
          ...this.eventList,
          result
        ];
      }

      let newCalendarEvent = this.convertToCalendarEvent(result);

      // if(newCalendarEvent.end == null)
      // {
      //   newCalendarEvent = this.endToUndefined(newCalendarEvent);
      // }
      if (this.events == null) {
        this.events = [newCalendarEvent];
      }
      else {
        this.events = [
          ...this.events,
          newCalendarEvent
        ];
      }
      this.refresh.next();
    });

    this.closeModal();
    this.refresh.next();
  }

  eventEdited(inputEvent: EventTaskInput): void {
    this.eventTaskService.editEventTask(inputEvent).subscribe(
      result => {
        let indexCalendar = this.events.indexOf(this.events.find(e => e.id === result.id));
        let indexEventList = this.eventList.indexOf(this.eventList.find(e => e.id === result.id));

        this.events[indexCalendar] = this.convertToCalendarEvent(result);
        this.eventList[indexEventList] = result;

        this.closeModal();
        this.refresh.next();
      }
    );
    this.refresh.next();
  }

  eventDeleted(newEventData: EventTaskInput): void {

    this.eventTaskService.deleteEventTasks(newEventData.id).subscribe(
      result => {
        this.events = this.events.filter(event => event.id !== newEventData.id);
        this.closeModal();
      });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  newEvent(day: Date): void {
    this.inputEvent = {
      title: null,
      startDt: null,
      endDt: null,
      colour: null,
      completed: false,
      description: null,
      draggable: true,
      resizable: true,
      userId: this.currentUserSubject.value.id
    };
    this.inputEvent.startDt = day;
    this.isDelete = false;
    this.isComplete = false;
    this.modal.open(this.eventContent);
  }

  editEvent(event: CalendarEvent) {
    this.inputEvent = {
      title: null,
      startDt: null,
      endDt: null,
      colour: null,
      completed: false,
      description: null,
      draggable: true,
      resizable: true,
      userId: this.currentUserSubject.value.id
    };
    let eventFound = this.eventList.find(e => e.id == event.id)
    this.inputEvent = eventFound;
    this.isDelete = false;
    this.isComplete = false;
    this.modal.open(this.eventContent);
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.inputEvent = {
      title: null,
      startDt: null,
      endDt: null,
      colour: null,
      completed: false,
      description: null,
      draggable: true,
      resizable: true,
      userId: this.currentUserSubject.value.id
    };
    let eventFound = this.eventList.find(e => e.id == eventToDelete.id)
    this.inputEvent = eventFound;
    this.isDelete = true;
    this.isComplete = false;
    this.modal.open(this.eventContent)
  }
  completeEvent(eventToComplete: CalendarEvent) {
    this.inputEvent = {
      title: null,
      startDt: null,
      endDt: null,
      colour: null,
      completed: false,
      description: null,
      draggable: true,
      resizable: true,
      userId: this.currentUserSubject.value.id
    };
    let eventFound = this.eventList.find(e => e.id == eventToComplete.id)
    this.inputEvent = eventFound;
    this.isDelete = false;
    this.isComplete = true;
    this.modal.open(this.eventContent)
  }

  closeModal(): void {
    this.modal.dismissAll(this.eventContent);
  }

  //have to manually add actions
  convertToCalendarEvent(input: EventTaskInput): CalendarEvent {
    var calendarEvent: CalendarEvent = {
      id: input.id,
      color: {
        primary: input.colour,
        secondary: input.colour
      },
      draggable: input.draggable,
      end: input.endDt,
      start: input.startDt,
      title: input.title,
      resizable: {
        afterEnd: input.resizable,
        beforeStart: input.resizable,
      },
      actions: this.actions
    }
    if (input.endDt == null) {
      calendarEvent.end = new Date('09-09-9999');
    }
    return calendarEvent;
  }

  setviewDate(event: any) {
    this.viewDate = event;
    console.log(event);
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      day.cssClass = 'cal-enabled';
    });
  }

}