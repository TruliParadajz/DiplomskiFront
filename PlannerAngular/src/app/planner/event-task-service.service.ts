import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar'
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, throwError, of, Subscription } from 'rxjs';
import { eventTaskInput, eventTaskOutput } from '@app/_models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventTaskServiceService {
  constructor(private http: HttpClient) { }

  getEventTasks(userId: number): Observable<any[]> {
    
    var eventTasksList: eventTaskInput[];
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

    return this.http.get<any[]>(`${environment.apiUrl}/eventTasks/${userId}`).pipe(
      map(
        (response: eventTaskInput[]) => {
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

            eventTasks.push({...eventTask});
          });

          return eventTasks;
        }
      )
    );    
  }

  editEventTask(editEventTask: eventTaskOutput){
    var eventTask = new eventTaskInput;

    return this.http.put<any>(`${environment.apiUrl}/eventTasks`, editEventTask).pipe(
      map((response: eventTaskInput) => {
        eventTask = response;

        var eventTaskReturn: CalendarEvent = {
          title: response.title,
          start: response.startDt,
          end: new Date(response.endDt),
          resizable : {
            afterEnd: response.resizable,
            beforeStart : response.resizable
          },
          id : response.id,
          draggable : response.draggable,
          color: {
            primary : response.colour,
            secondary: response.colour
          }
        }

        return eventTaskReturn;
      }
      )
    );
  }

}
