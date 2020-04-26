import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { EventTaskServiceService } from '@app/planner/event-task-service.service';
import { BehaviorSubject } from 'rxjs';
import { User, EventTaskInput } from '@app/_models';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { isThisSecond } from 'date-fns';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.less']
})


export class StatisticsComponent implements OnInit {

  //eventTasks
  currentUserSubject: BehaviorSubject<User>;
  eventList: EventTaskInput[] = [];
  eventsCompleted: EventTaskInput[] = [];
  eventsOngoing: EventTaskInput[] = [];
  eventsShort: EventTaskInput[] = [];
  eventsLong: EventTaskInput[] = [];
  eventsIndefinite: EventTaskInput[] = [];
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        font: {
          weight: 'bold',
          size: 20,
        },
        formatter: (value, ctx) => {
          if (value != null && value != 0) {
            const label = ((Math.round(value / this.eventList.length * 100) / 100) * 100).toPrecision(2).toString() + "%";
            return label;
          }
          else {
            return '';
          }
        }
      }
    }
  };

  public pieChartLabels: Label[] = ['Completed', 'Ongoing'];
  public pieChartData: SingleDataSet = [this.eventsCompleted.length, this.eventsOngoing.length];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors: Array<any> = [{
    backgroundColor: ['rgba(173, 33, 33, 1)', 'rgba(30, 144, 255, 1)', 'rgba(227, 188, 8, 1)'],
    borderColor: []
  }];
  constructor(private eventTaskService: EventTaskServiceService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.eventTaskService.getEventTasks(this.currentUserSubject.value.id)
      .subscribe((res: EventTaskInput[]) => {
        this.eventList = res;
        this.showCompletion();
      });
  }

  showCompletion() {
    this.eventsCompleted = this.eventList.filter(r => r.completed == true);
    this.eventsOngoing = this.eventList.filter(r => r.completed == false);

    this.pieChartLabels = ['Completed', 'Ongoing'];
    this.pieChartData = [this.eventsCompleted.length, this.eventsOngoing.length];

    this.pieChartColors[0].backgroundColor = ['rgba(227, 188, 8, 1)', 'rgba(30, 144, 255, 1)'];
  }

  showTime() {
    this.eventsShort = this.eventList.filter(r => r.colour == '#ad2121');
    this.eventsLong = this.eventList.filter(r => r.colour == '#1e90ff');
    this.eventsIndefinite = this.eventList.filter(r => r.colour == '#e3bc08');

    this.pieChartLabels = ['Less than 3 days', 'More than 3 days', 'Indefinite'];
    this.pieChartData = [this.eventsShort.length, this.eventsLong.length, this.eventsIndefinite.length];

    this.pieChartColors[0].backgroundColor = ['rgba(173, 33, 33, 1)', 'rgba(30, 144, 255, 1)', 'rgba(227, 188, 8, 1)'];
  }

}
