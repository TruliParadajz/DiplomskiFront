import { Component, OnInit } from '@angular/core';
import { SettingsServiceService } from '../settings-service.service';
import { UserService, AlertService } from '@app/_services';
import { BehaviorSubject } from 'rxjs';
import { User, userNotificationModel } from '@app/_models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'settings-eventtasksettings',
  templateUrl: './eventtasksettings.component.html',
  styleUrls: ['./eventtasksettings.component.less']
})
export class EventtasksettingsComponent implements OnInit {
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  currentUserSubject: BehaviorSubject<User>;
  userId: number;
  userNotificationId: number;
  hoursValue: number;
  isEmail: boolean;
  isApp: boolean;
  enableUpdate: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsServiceService,
    private alertService: AlertService,
    private userService: UserService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  get f() { return this.updateForm.controls; }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      emailNotification: [false,],
      appNotification: [false,],
      hours: [,]
    });
    this.settingsService.getNotificationSettings(this.currentUserSubject.value.id)
      .pipe(first())
      .subscribe(
        (res: userNotificationModel) => {

          this.userId = res.userId;
          this.userNotificationId = res.id;
          this.hoursValue = res.hours;
          this.isApp = res.appNotification;
          this.isEmail = res.emailNotification;


          var result: userNotificationModel = res;
          this.updateForm = this.formBuilder.group({
            emailNotification: [res.emailNotification,],
            appNotification: [res.appNotification,],
            hours: [res.hours,]
          });
        }
      );
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }

    this.loading = true;
    let inputModel: userNotificationModel = new userNotificationModel(
      this.userNotificationId,
      this.userId,
      this.updateForm.value.emailNotification,
      this.updateForm.value.appNotification,
      this.hoursValue
    )
    this.settingsService.updateNotificationSettings(inputModel)
      .pipe(first())
      .subscribe(
        (res: userNotificationModel) => {
          this.updateForm = this.formBuilder.group({
            emailNotification: [res.emailNotification,],
            appNotification: [res.appNotification,],
            hours: [this.hoursValue,]
          });
          this.loading = false;
        }
        ,
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      )
  }

  hoursChanged(event) {
    this.enableUpdate = true;
    this.hoursValue = event.value;
    this.updateForm = this.formBuilder.group({
      emailNotification: [this.f.emailNotification.value,],
      appNotification: [this.f.appNotification.value,],
      hours: [this.hoursValue,]
    });
  }

  appChanged(event) {
    this.enableUpdate = true;
    this.isApp = !this.isApp;
    this.updateForm = this.formBuilder.group({
      emailNotification: [this.f.emailNotification.value,],
      appNotification: [this.isApp,],
      hours: [this.hoursValue,]
    });
  }

  emailChanged(event) {
    this.enableUpdate = true;
    this.isEmail = !this.isEmail;
    this.updateForm = this.formBuilder.group({
      emailNotification: [this.isEmail,],
      appNotification: [this.f.appNotification.value,],
      hours: [this.hoursValue,]
    });
  }
}
