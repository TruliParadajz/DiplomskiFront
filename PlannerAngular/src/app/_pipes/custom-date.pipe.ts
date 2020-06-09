import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'customDateFormat'})
export class CustomDateFormat implements PipeTransform {
  transform(value: Date): string {
    if(value == null) {
      return '-';
    }
    else {
      return value.toLocaleString();
    }
  }
}