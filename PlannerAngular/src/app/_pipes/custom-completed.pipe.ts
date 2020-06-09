import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'customCompletedFormat'})
export class CustomCompletedFormat implements PipeTransform {
  transform(value: boolean): string {
    if(value == true) {
      return 'Yes';
    }
    else {
      return 'No';
    }
  }
}