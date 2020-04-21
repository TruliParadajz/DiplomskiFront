import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        }
        else {
            matchingControl.setErrors(null);
        }
    }
}

export function MustMatchOld(controlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];

        if (control.errors && !control.errors.mustMatchOld) {
            // return if another validator has already found an error on the control
            return;
        }
        let currentPassword = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentPassword')));  

        console.log(currentPassword);

        if (control.value !== currentPassword.value) {
            control.setErrors({ mustMatchOld: true })
        }
        else {
            control.setErrors(null);
        }
    }
}