import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

import { ContextMenuComponent } from 'ngx-contextmenu';
import { EventTaskServiceService } from '../event-task-service.service';
import { User, EventTaskInput } from '@app/_models';
import { first } from 'rxjs/operators';

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
  selector: 'app-planner-view',
  templateUrl: './planner-view.component.html',
  styleUrls: ['./planner-view.component.less']
})

// Code
export class PlannerViewComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  @ViewChild(ContextMenuComponent, { static: true }) public basicMenu: ContextMenuComponent;

  @ViewChild('eventContent', { static: true }) eventContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  inputEvent: CalendarEvent;
  //Bool value for delete content
  isDelete: boolean;

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
    }
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[];

  currentUserSubject: BehaviorSubject<User>;

  ngOnInit() {
    this.eventTaskService.getEventTasks(this.currentUserSubject.value.id).subscribe(res => {
      this.events = res;
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
    console.log(date);
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.editEvent(event);
  }
  eventAdded(newEventData: CalendarEvent): void {
    var sendEventTask = new EventTaskInput(
      newEventData.id as number,
      newEventData.start,
      newEventData.end,
      newEventData.title,
      newEventData.color.primary,
      newEventData.resizable.beforeStart,
      newEventData.draggable,
      this.currentUserSubject.value.id,
      this.currentUserSubject.value
    );
    this.eventTaskService.addEventTask(sendEventTask).subscribe(result => {
      result.actions = this.actions;
      this.events = [
        ...this.events,
        result
      ];
      console.log("newEventData: ", newEventData);
      console.log("result: ", result);
      this.refresh.next();
    });

    this.closeModal();
    this.refresh.next();
  }

  eventEdited(newEventData: CalendarEvent): void {
    var sendEventTask = new EventTaskInput(
      newEventData.id as number,
      newEventData.start,
      newEventData.end,
      newEventData.title,
      newEventData.color.primary,
      newEventData.resizable.beforeStart,
      newEventData.draggable,
      this.currentUserSubject.value.id,
      this.currentUserSubject.value
    );
    this.eventTaskService.editEventTask(sendEventTask).subscribe(
      result => {
        result.actions = this.actions;
        let index = this.events.indexOf(this.events.find(e => e.id === result.id));
        this.events[index] = result;

        this.closeModal();
        this.refresh.next();
      }
    );
    this.refresh.next();
  }

  eventDeleted(newEventData: CalendarEvent): void {

    this.eventTaskService.deleteEventTasks(newEventData.id as number).subscribe(
      result => {
        this.events = this.events.filter(event => event !== newEventData);
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
      start: null,
      end: null
    };
    this.inputEvent.start = day;
    this.isDelete = false;
    this.modal.open(this.eventContent);
  }

  editEvent(event: CalendarEvent) {
    this.inputEvent = {
      title: null,
      start: null,
      end: null
    };
    this.inputEvent = event;
    this.isDelete = false;
    this.modal.open(this.eventContent);
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.inputEvent = {
      title: null,
      start: null,
      end: null
    };
    this.inputEvent = eventToDelete;
    this.isDelete = true;
    this.modal.open(this.eventContent)
  }
  closeModal(): void {
    this.modal.dismissAll(this.eventContent);
  }
}