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
              eventTask = this.initializeEventTask(eventTask);
              eventTask.id = element.id,
                eventTask.title = element.title,
                eventTask.start = parseISO(element.startDt.toString() + "Z"),
                eventTask.end = parseISO(element.endDt.toString() + "Z"),
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

    return this.http.delete<EventTaskInput>(`${environment.apiUrl}/eventTasks/${taskId}`)
      .pipe(
        map((response: EventTaskInput) => {
          eventTask = response;

          var eventTaskReturn: CalendarEvent = {
            title: response.title,
            start: parseISO(response.startDt.toString() + "Z"),
            end: parseISO(response.endDt.toString() + "Z"),
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

    return this.http.put<EventTaskInput>(`${environment.apiUrl}/eventTasks`, editEventTask)
      .pipe(
        map((response: EventTaskInput) => {
          eventTask = response;

          var eventTaskReturn: CalendarEvent = {
            title: response.title,
            start: parseISO(response.startDt.toString() + "Z"),
            end: parseISO(response.endDt.toString() + "Z"),
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

    return this.http.post<EventTaskInput>(`${environment.apiUrl}/eventTasks`, newEventTask)
      .pipe(
        map(
          (response: EventTaskInput) => {
            console.log(response);
            eventTask = response;

            var eventTaskReturn: CalendarEvent = {
              title: response.title,
              start: parseISO(response.startDt.toString() + "Z"),
              end: parseISO(response.endDt.toString() + "Z"),
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
