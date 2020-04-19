import { Component, OnInit } from '@angular/core';
import { SettingsServiceService } from '../settings-service.service';
import { UserService } from '@app/_services';
import { BehaviorSubject } from 'rxjs';
import { User } from '@app/_models';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsServiceService,
    private userService: UserService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  ngOnInit(): void {
    this.settingsService.getNotificationSettings(this.currentUserSubject.value.id)
      .subscribe(res => {
        console.log(res);
      }
      );
  }

  onSubmit() {
    
  }
}
