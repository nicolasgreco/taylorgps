import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { share } from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ScrollEvent} from 'ngx-scroll-event';

import {DataService} from '../store/data.service';
import {TripService} from '../services/trip-service';

import {Trip} from '../models/trip';
import {Route} from '../models/route';
import {Itinerary} from '../models/itinerary';

@Component({
  selector: 'tg-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent implements OnInit {
  trip: Observable<Trip>;
  monthYearGroup: Array<any> = [];
  title: string;
  tripId: number;

  constructor(private data: DataService,
              private tripService: TripService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params.id.split('-');
    this.tripId = params.shift();
    this.title = params.join('-');
    //this.trip = this.getTrip().pipe(share());
    this.getRoutes();
  }

  getTrip() {
    const id = +this.route.snapshot.params.id;
    return this.tripService.getTrip(id);
    //this.tripService.getTrip(id).subscribe(trip => this.trip = trip);
  }

  getRoutes() {
    //const id = +this.route.snapshot.params.id;
    //return this.tripService.getRoutes(this.tripId);

    this.tripService.getRoutes(this.tripId)
      .subscribe(routes => {
        routes.forEach((route: Route) => {
          route.url = route.name.replace(/\s/g, '-');
          const monthYear = route.date.substring(0, 7);
          const day = route.date;
          let monthYearItem = this.monthYearGroup.find(it => it.month_year === monthYear);

          if (!monthYearItem){
            monthYearItem = {month_year: monthYear, itineraries: new Array<Itinerary>(), date: route.date};
            this.monthYearGroup.push(monthYearItem);
          }

          let itinerary: Itinerary = monthYearItem.itineraries.find(it => it.date === day);

          if (!itinerary){
            itinerary = new Itinerary(day);
            monthYearItem.itineraries.push(itinerary);
          }

          itinerary.routes.push(route);

        })

        this.data.setRoutes(this.monthYearGroup);
      });

  }

  public handleScroll(event: ScrollEvent) {
    //console.log(event);

    //this.data.changeDate(currentDate);
  }

}
