import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class DayTimeFormatter extends CalendarDateFormatter {
  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'HH:mm', locale);
  }
}
