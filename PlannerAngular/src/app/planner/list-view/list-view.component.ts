import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { EventTaskInput, User } from '@app/_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventTaskServiceService } from '../event-task-service.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.less']
})
export class ListViewComponent implements OnInit {
  @ViewChild('eventContent', { static: true }) eventContent: TemplateRef<any>;
  refresh: Subject<any> = new Subject();
  eventList: EventTaskInput[] = [];
  currentUserSubject: BehaviorSubject<User>;
  inputEvent: EventTaskInput;
  listLength: number;

  tableEvents = new MatTableDataSource(this.eventList);

  displayedColumns: string[] = ['title', 'startDt', 'endDt', 'completed', 'edit', 'delete', 'changeComplete'];
  isDelete: boolean;
  isComplete: boolean;

  constructor(private modal: NgbModal,
    private eventTaskService: EventTaskServiceService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  ngOnInit(): void {
    this.eventTaskService.getEventTasks(this.currentUserSubject.value.id)
      .subscribe((res: EventTaskInput[]) => {
        this.eventList = res;
        this.tableEvents = new MatTableDataSource(this.eventList);
        this.listLength = this.eventList.length;
      });
  }
  editEvent(event: EventTaskInput) {
    this.inputEvent = event;
    this.isDelete = false;
    this.isComplete = false;
    this.modal.open(this.eventContent);
  }

  deleteEvent(event: EventTaskInput) {
    this.inputEvent = event;
    this.isDelete = true;
    this.isComplete = false;
    this.modal.open(this.eventContent);
  }
  completeEvent(event: EventTaskInput) {
    this.inputEvent = event;
    this.isDelete = false;
    this.isComplete = true;
    this.modal.open(this.eventContent);
  }
  eventEdited(inputEvent: EventTaskInput): void {
    this.eventTaskService.editEventTask(inputEvent).subscribe(
      result => {
        let indexEventList = this.eventList.indexOf(this.eventList.find(e => e.id === result.id));
        this.eventList[indexEventList] = result;

        this.tableEvents = new MatTableDataSource(this.eventList);

        this.closeModal();
        this.refresh.next();
      }
    );
    this.refresh.next();
  }

  eventDeleted(inputEvent: EventTaskInput): void {
    this.eventTaskService.deleteEventTasks(inputEvent.id).subscribe(
      result => {
        this.eventList = this.eventList.filter(event => event.id !== inputEvent.id);

        this.tableEvents = new MatTableDataSource(this.eventList);
        this.listLength = this.eventList.length;
        this.closeModal();
      });
  }

  addEvent(): void {
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
    this.inputEvent.startDt = new Date();
    this.isDelete = false;
    this.isComplete = false;
    this.modal.open(this.eventContent);
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
      this.tableEvents = new MatTableDataSource(this.eventList);
        this.listLength = this.eventList.length;
    });
    this.closeModal();
    this.refresh.next();
  }

  closeModal(): void {
    this.modal.dismissAll(this.eventContent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    if (filterValue == 'yes') {
      this.tableEvents.filterPredicate = function (data, filter): boolean {
        return String(data.completed).includes('true')
      }
    }
    if (filterValue == 'no') {
      this.tableEvents.filterPredicate = function (data, filter): boolean {
        return String(data.completed).includes('false')
      }
    }
    this.tableEvents.filter = filterValue;
  }

}
