import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar'
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, throwError, of, Subscription } from 'rxjs';
import { EventTaskInput, eventTaskOutput } from '@app/_models';
import { map } from 'rxjs/operators';
import { parseISO } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class EventTaskServiceService {
  constructor(private http: HttpClient) { }

  initializeEventTask(eventTaskInput: CalendarEvent) {
    var eventTaskOutput: CalendarEvent = {
      start: new Date,
      title: "",
      actions: null,
      allDay: null,
      color: {
        primary: null,
        secondary: null
      },
      cssClass: null,
      draggable: null,
      end: null,
      id: null,
      meta: null,
      resizable: {
        afterEnd: null,
        beforeStart: null
      }
    };
    return eventTaskOutput;
  }

  createReturnEventTask(response: EventTaskInput): CalendarEvent {
    var returnEventTask: CalendarEvent;
    returnEventTask = this.initializeEventTask(returnEventTask);

    returnEventTask.id = response.id;
    returnEventTask.title = response.title;
    returnEventTask.start = parseISO(response.startDt.toString() + "Z");
    if(response.endDt != null) {
      returnEventTask.end = parseISO(response.endDt.toString() + "Z");
    }
    returnEventTask.color.primary = response.colour;
    returnEventTask.color.secondary = response.colour;
    returnEventTask.resizable.beforeStart = response.resizable;
    returnEventTask.resizable.afterEnd = response.resizable;
    returnEventTask.draggable = response.draggable;

    return returnEventTask;
  }

  getEventTasks(userId: number): Observable<any[]> {

    var eventTasksList: EventTaskInput[];
    var eventTask: CalendarEvent ;

    return this.http.get<EventTaskInput[]>(`${environment.apiUrl}/eventTasks/${userId}`)
      .pipe(
        map(
          (response: EventTaskInput[]) => {
            var eventTasks: CalendarEvent[] = [];
            eventTasksList = response;

            if (eventTasksList.length <= 0) {
              return null;
            }
            eventTasksList.forEach(element => {
              eventTask = this.createReturnEventTask(element);

              eventTasks.push({ ...eventTask });
            });

            return eventTasks;
          }
        )
      );

  }

  deleteEventTasks(taskId: number): Observable<CalendarEvent> {
    var eventTask = new EventTaskInput(null, null, null, null, null, null, null, null, null);

    return this.http.delete<EventTaskInput>(`${environment.apiUrl}/eventTasks/${taskId}`)
      .pipe(
        map((response: EventTaskInput) => {
          eventTask = response;

          var eventTaskReturn = this.createReturnEventTask(response);

          return eventTaskReturn;
        }
        )
      );

  }

  editEventTask(editEventTask: EventTaskInput): Observable<CalendarEvent> {
    var eventTask = new EventTaskInput(null, null, null, null, null, null, null, null, null);

    return this.http.put<EventTaskInput>(`${environment.apiUrl}/eventTasks`, editEventTask)
      .pipe(
        map((response: EventTaskInput) => {
          eventTask = response;

          var eventTaskReturn = this.createReturnEventTask(response);

          return eventTaskReturn;
        }
        )
      );
  }

  addEventTask(newEventTask: EventTaskInput): Observable<CalendarEvent> {
    var eventTask = new EventTaskInput(null, null, null, null, null, null, null, null, null);

    return this.http.post<EventTaskInput>(`${environment.apiUrl}/eventTasks`, newEventTask)
      .pipe(
        map(
          (response: EventTaskInput) => {
            console.log(response);
            eventTask = response;

            var eventTaskReturn = this.createReturnEventTask(response);
            return eventTaskReturn;
          }
        )
      )
  }
}
