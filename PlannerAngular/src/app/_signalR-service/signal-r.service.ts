import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { environment } from '@environments/environment';
import { NotificationModel } from '@app/_models/notificationModel';
import { AlertService } from '@app/_services';

function showAlert(text) {
  alert(text);
}

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: NotificationModel;
  private hubConnection: signalR.HubConnection;

  constructor(private alertService: AlertService){}
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:57541/notification`)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addDataListener = () => {
    this.hubConnection.on('transfernotifications', (data: NotificationModel) => {
      this.data = data;
      showAlert(data.text);
      console.log(data);
    });
  }

}
