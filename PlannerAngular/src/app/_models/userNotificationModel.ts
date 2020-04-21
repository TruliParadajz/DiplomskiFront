export class userNotificationModel { 
    id: number;
    userId: number;
    emailNotification: boolean;
    appNotification: boolean;
    hours: number;

    /**
     *
     */
    constructor(id: number, userId: number, emailNotification: boolean, appNotification: boolean, hours: number) {
        this.id = id;
        this.userId = userId;
        this.emailNotification = emailNotification;
        this.appNotification = appNotification;
        this.hours = hours;
    }
}