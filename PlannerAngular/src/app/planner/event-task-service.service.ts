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

  createReturnEventTask(response: EventTaskInput): EventTaskInput {
    response.startDt = parseISO(response.startDt.toString() + "Z");
    if (response.endDt != null) {
      response.endDt = parseISO(response.endDt.toString() + "Z");
    }
    return response;
  }

  getEventTasks(userId: number): Observable<EventTaskInput[]> {

    return this.http.get<EventTaskInput[]>(`${environment.apiUrl}/eventTasks/${userId}`)
      .pipe(
        map(
          (response: EventTaskInput[]) => {

            if (response.length <= 0) {
              return null;
            }
            response.forEach(element => {
              element = this.createReturnEventTask(element);
            });
            return response;
          }
        )
      );

  }

  deleteEventTasks(taskId: number): Observable<EventTaskInput> {

    return this.http.delete<EventTaskInput>(`${environment.apiUrl}/eventTasks/${taskId}`)
      .pipe(
        map((response: EventTaskInput) => {
          var eventTaskReturn = this.createReturnEventTask(response);
          return eventTaskReturn;
        }
        )
      );

  }

  editEventTask(editEventTask: EventTaskInput): Observable<EventTaskInput> {

    return this.http.put<EventTaskInput>(`${environment.apiUrl}/eventTasks`, editEventTask)
      .pipe(
        map((response: EventTaskInput) => {
          var eventTaskReturn = this.createReturnEventTask(response);
          return eventTaskReturn;
        }
        )
      );
  }

  addEventTask(newEventTask: EventTaskInput): Observable<EventTaskInput> {

    return this.http.post<EventTaskInput>(`${environment.apiUrl}/eventTasks`, newEventTask)
      .pipe(
        map(
          (response: EventTaskInput) => {

            var eventTaskReturn = this.createReturnEventTask(response);
            return eventTaskReturn;
          }
        )
      )
  }
}
