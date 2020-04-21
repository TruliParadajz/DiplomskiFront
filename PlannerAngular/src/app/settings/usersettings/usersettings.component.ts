import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '@app/_models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, UserService, AuthenticationService } from '@app/_services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MustMatch, MustMatchOld } from '@app/_helpers/must-match.validator';

@Component({
  selector: 'settings-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.less']
})
export class UsersettingsComponent implements OnInit {

  updateForm: FormGroup;
  loading = false;
  submitted = false;
  currentUserSubject: BehaviorSubject<User>;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userService: UserService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));    
   }

   get f() { return this.updateForm.controls; }
  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      firstName: [,],
      lastName: [,],
      username: [, Validators.email],
      password: [, Validators.minLength(6)],
      oldPassword: [, [Validators.required, Validators.minLength(6)]]
    },
    {      
      validator: [MustMatchOld('oldPassword')]
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
    this.userService.update(this.updateForm.value, this.currentUserSubject.value.id)
      .pipe(first())
      .subscribe(
        data => {
          this.authenticationService.logout();
          this.router.navigate(['/login']);
          this.alertService.success('User updated successfully, please re-log', true);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
