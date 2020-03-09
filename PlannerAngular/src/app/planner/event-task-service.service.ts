import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar'
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, throwError, of, Subscription } from 'rxjs';
import { EventTaskInput, eventTaskOutput } from '@app/_models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventTaskServiceService {
  constructor(private http: HttpClient) { }

  getEventTasks(userId: number): Observable<any[]> {

    var eventTasksList: EventTaskInput[];
    var eventTask: CalendarEvent = {
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

    return this.http.get<any[]>(`${environment.apiUrl}/eventTasks/${userId}`)
      .pipe(
        map(
          (response: EventTaskInput[]) => {
            eventTasksList = response;

            if (eventTasksList.length <= 0) {
              return null;
            }

            var eventTasks: CalendarEvent[] = [];
            eventTasksList.forEach(element => {
              eventTask.id = element.id,
                eventTask.title = element.title,
                eventTask.start = new Date(element.startDt),
                eventTask.end = new Date(element.endDt),
                eventTask.color.primary = element.colour,
                eventTask.draggable = element.draggable,
                eventTask.resizable.afterEnd = element.resizable,
                eventTask.resizable.beforeStart = element.resizable

              eventTasks.push({ ...eventTask });
            });

            return eventTasks;
          }
        )
      );

  }

  deleteEventTasks(taskId: number): Observable<CalendarEvent> {
    var eventTask = new EventTaskInput(null, null, null, null, null, null, null, null, null);

    return this.http.delete<any>(`${environment.apiUrl}/eventTasks/${taskId}`)
      .pipe(
        map((response: EventTaskInput) => {
          eventTask = response;

          var eventTaskReturn: CalendarEvent = {
            title: response.title,
            start: response.startDt,
            end: new Date(response.endDt),
            resizable: {
              afterEnd: response.resizable,
              beforeStart: response.resizable
            },
            id: response.id,
            draggable: response.draggable,
            color: {
              primary: response.colour,
              secondary: response.colour
            }
          }

          return eventTaskReturn;
        }
        )
      );

  }

  editEventTask(editEventTask: EventTaskInput): Observable<CalendarEvent> {
    var eventTask = new EventTaskInput(null, null, null, null, null, null, null, null, null);

    return this.http.put<any>(`${environment.apiUrl}/eventTasks`, editEventTask)
      .pipe(
        map((response: EventTaskInput) => {
          eventTask = response;

          var eventTaskReturn: CalendarEvent = {
            title: response.title,
            start: response.startDt,
            end: new Date(response.endDt),
            resizable: {
              afterEnd: response.resizable,
              beforeStart: response.resizable
            },
            id: response.id,
            draggable: response.draggable,
            color: {
              primary: response.colour,
              secondary: response.colour
            }
          }

          return eventTaskReturn;
        }
        )
      );
  }

  addEventTask(newEventTask: EventTaskInput): Observable<CalendarEvent> {
    var eventTask = new EventTaskInput(null, null, null, null, null, null, null, null, null);

    return this.http.post<any>(`${environment.apiUrl}/eventTasks`, newEventTask)
      .pipe(
        map(
          (response: EventTaskInput) => {
            console.log(response);
            eventTask = response;

            var eventTaskReturn: CalendarEvent = {
              title: response.title,
              start: response.startDt,
              end: new Date(response.endDt),
              resizable: {
                afterEnd: response.resizable,
                beforeStart: response.resizable
              },
              id: response.id,
              draggable: response.draggable,
              color: {
                primary: response.colour,
                secondary: response.colour
              }
            }

            return eventTaskReturn;
          }
        )
      )
  }

}
