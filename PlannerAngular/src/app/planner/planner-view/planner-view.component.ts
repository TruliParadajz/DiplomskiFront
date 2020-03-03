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
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

import { ContextMenuComponent } from 'ngx-contextmenu';
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

  events: CalendarEvent[] = [
    {
      id: 1,
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      id: 2,
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      id: 3,
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },
    {
      id: 4,
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  initializeEvent(event: CalendarEvent): void {
    event = {
      title: null,
      start: null,
      end: null
    };
  }

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) { }

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
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
  }

  // handleEvent(action: string, event: CalendarEvent): void {
  //   this.modalData = { event, action };
  //   this.modal.open(this.modalContent, { size: 'lg' });
  // }

  eventAdded(newEventData: CalendarEvent): void {
    this.events = [
      ...this.events,
      newEventData
    ]
    this.closeModal();
  }

  eventEdited(newEventData: CalendarEvent): void {
    let eventFound = this.events.find(e => e.id === newEventData.id);
    let index = this.events.indexOf(eventFound);
    this.events[index] = newEventData;
    // console.log("edited", newEventData);
    this.closeModal();
  }

  eventDeleted(newEventData : CalendarEvent): void {
    this.events = this.events.filter(event => event !== newEventData);
    this.closeModal();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  //
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