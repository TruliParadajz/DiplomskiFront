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

    getNotificationSettings(userId: number) {
        var userNotifications: userNotificationModel;

        return this.http.get<userNotificationModel>(`${environment.apiUrl}/UserNotifications/userId/${userId}`)
            .pipe(
                map(
                    (response: userNotificationModel) => {
                        userNotifications = response;
                        return userNotifications;
                    }
                )
            );
    }
    updateNotificationSettings(inputModel: userNotificationModel) {
        // this.http.put
    }
}