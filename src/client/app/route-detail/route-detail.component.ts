import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TripService} from '../services/trip-service';
import {Route} from '../models/route';
import {share} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'tg-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.scss']
})
export class RouteDetailComponent implements OnInit {
  params;
  tripId: number;
  routeId: number;
  routeDetail: Observable<Route>;
  constructor(private route: ActivatedRoute, private tripService: TripService) { }

  ngOnInit() {
    this.routeId = this.route.snapshot.params.route_id.split('-')[0];
    this.tripId = this.route.snapshot.params.id.split('-')[0];
    this.routeDetail = this.getRoute().pipe(share());
  }

  getRoute() {
    const id = +this.route.snapshot.params.id;
    return this.tripService.getRoute(this.tripId, this.routeId);
    //this.tripService.getTrip(id).subscribe(trip => this.trip = trip);
  }

}
