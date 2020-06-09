import { Component, OnInit, TemplateRef, Output, EventEmitter, Input, Type } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventTaskInput, User } from '@app/_models';

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

  @Input() inputEvent: EventTaskInput;
  @Input() isDelete: boolean;
  @Input() isComplete: boolean;

  eventTaskForm: FormGroup;

  viewDate: Date = new Date();
  eventTemplate: EventTaskInput;

  dateFrom: Date;
  dateTo: Date;
  eventTitle: string;
  description: string;
  completed: boolean = true;
  submitted: boolean = false;
  createFlag: boolean = false;
  editFlag: boolean = false;
  loading: boolean = false;
  dateError: boolean = false;

  inputString: string ="";

  constructor(private formBuilder: FormBuilder, ) { }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (t.value != null && f.value > t.value) {
        return {
          dates: "Date from should be less than Date to"
        };
      }
      return {};
    }
  }

  ngOnInit(): void {
    var today = new Date();
    this.eventTitle = this.inputEvent.title;
    this.dateFrom = this.inputEvent.startDt;
    this.dateTo = this.inputEvent.endDt;
    this.description = this.inputEvent.description;
    this.completed = this.inputEvent.completed;
    if(this.completed == true) {
      this.inputString = " activate ";
    }
    else {
      this.inputString = " complete ";
    }
    if (this.dateFrom.getDate() === today.getDate()) {
      this.dateFrom.setTime(today.getTime());
    }

    this.eventTaskForm = this.formBuilder.group({
      eventTitle: [this.eventTitle, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      dateFrom: [this.dateFrom, Validators.required],
      dateTo: [this.dateTo],
      description: [this.description],
      completed: [this.completed]
    },
      { validator: this.dateLessThan('dateFrom', 'dateTo') });
  }
  get f() { return this.eventTaskForm.controls; }

  get errors() { return this.eventTaskForm.errors; }

  addEvent(eventTitle: string, dateFrom: Date, dateTo: Date, description: string): void {
    this.eventTemplate =
    {
      title: eventTitle,
      startDt: dateFrom,
      endDt: dateTo,
      colour: colors.red.primary,
      draggable: true,
      resizable: true,
      completed: false,
      description: description,
      userId: this.inputEvent.userId
    };
    this.eventAdded.emit(this.eventTemplate);
  }

  editEvent(eventTitle: string, dateFrom: Date, dateTo: Date, description: string) {
    this.eventTemplate = this.inputEvent;
    this.eventTemplate.title = eventTitle;
    this.eventTemplate.startDt = dateFrom;
    this.eventTemplate.endDt = dateTo;
    this.eventTemplate.description = description
    this.eventEdited.emit(this.eventTemplate);
  }

  deleteEvent() {
    this.eventDeleted.emit(this.inputEvent);
  }

  completeEvent() {
    this.completed = !this.completed
    this.inputEvent.completed = this.completed;
    this.eventEdited.emit(this.inputEvent);
  }

  closeModal(): void {
    this.modalClosed.emit(1);
  }

  createTrue(): void {
    this.createFlag = true;
  }
  editTrue(): void {
    this.editFlag = true;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.eventTaskForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.createFlag) {
      this.addEvent(this.eventTaskForm.value.eventTitle, 
        this.eventTaskForm.value.dateFrom, 
        this.eventTaskForm.value.dateTo,
        this.eventTaskForm.value.description);
    }
    if (this.editFlag) {
      this.editEvent(this.eventTaskForm.value.eventTitle,
         this.eventTaskForm.value.dateFrom, 
         this.eventTaskForm.value.dateTo,
         this.eventTaskForm.value.description);
    }
  }

}
