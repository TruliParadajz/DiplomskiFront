import { Component, OnInit } from '@angular/core';
import { EventTaskInput, User } from '@app/_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventTaskServiceService } from '../event-task-service.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.less']
})
export class ListViewComponent implements OnInit {
  eventList: EventTaskInput[] = [];
  currentUserSubject: BehaviorSubject<User>;

  displayedColumns: string[] = ['title', 'startDt', 'endDt', 'completed'];

  constructor(private modal: NgbModal,
    private eventTaskService: EventTaskServiceService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
  }

  ngOnInit(): void {
    this.eventTaskService.getEventTasks(this.currentUserSubject.value.id)
      .subscribe((res: EventTaskInput[]) => {
        this.eventList = res;
      });
  }

}
