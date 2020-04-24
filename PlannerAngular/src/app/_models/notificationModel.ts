export interface NotificationModel {
    userId: number;
    recipient: string;
    subject: string;
    text: string;
    eventTaskId: number;
    startDateTime: string;
    endDateTime: string;
    hours: number
}