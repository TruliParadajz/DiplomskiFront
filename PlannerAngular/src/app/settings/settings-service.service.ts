import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar'
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, throwError, of, Subscription } from 'rxjs';
import { EventTaskInput, eventTaskOutput, userNotificationModel } from '@app/_models';
import { map } from 'rxjs/operators';
import { parseISO } from 'date-fns';

@Injectable({
    providedIn: 'root'
})

export class SettingsServiceService {
    constructor(private http: HttpClient) {
    }
    getNotificationSettings(userId: number): Observable<userNotificationModel> {
        return this.http.get<userNotificationModel>(`${environment.apiUrl}/UserNotifications/userId/${userId}`)
            .pipe(
                map(
                    (res: userNotificationModel) => {
                        return res;
                    }
                )
            );
    }
    updateNotificationSettings(inputModel: userNotificationModel): Observable<userNotificationModel> {
        return this.http.put<userNotificationModel>(`${environment.apiUrl}/UserNotifications`, inputModel)
            .pipe(
                map(
                    (res: userNotificationModel) => {
                        return res;
                    }
                )
            )
    }
}