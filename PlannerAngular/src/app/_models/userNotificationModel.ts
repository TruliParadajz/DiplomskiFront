export class userNotificationModel { 
    Id: number;
    UserId: number;
    EmailNotification: boolean;
    AppNotification: boolean;
    Hours: number;

    /**
     *Constructs empty userNotificationModel
     */
    constructor() {
        this.Id = 0;
        this.UserId = 0;
        this.EmailNotification = false;
        this.AppNotification = false;
        this.Hours = 24;
    }
}