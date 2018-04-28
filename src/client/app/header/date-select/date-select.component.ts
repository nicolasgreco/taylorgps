import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DataService} from '../../store/data.service';

@Component({
  selector: 'tg-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss']
})
export class DateSelectComponent implements OnInit {
  selectedDate: number;
  selectedMonth: any;
  months = {};
  iterableMonths = [];
  private monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(private data: DataService) {
  }

  onMonthChange(event) {
    this.selectedDate = event.value.dates[0];
  }

  ngOnInit() {
    console.log('as');
    this.data.currentDate.subscribe((date) => {
      this.selectedMonth = this.months[date.getMonth()];
      this.selectedDate = date.getDate();
    });

    this.data.currentRoutes.subscribe((routes: Array<any>) => {
      console.log('s');
      if (Object.keys(routes).length === 0)
        return false;
      routes.map((route) => {
        const month = route.date.getMonth();
        const date = route.date.getDate();
        const year = route.date.getFullYear();

        this.months[month] = this.months[month] || {value: month, viewValue: `${this.monthNames[month]} ${year}`};
        this.months[month].dates = this.months[month].dates || [];
        this.months[month].dates.push(date);
      });

      this.iterableMonths = Object.values(this.months);
      this.selectedMonth = this.iterableMonths[0];
      this.selectedDate = this.selectedMonth.dates[0];
    });

  }
}
