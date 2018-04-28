import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private date = new BehaviorSubject(new Date());
  private routes = new BehaviorSubject({});
  currentDate = this.date.asObservable();
  currentRoutes = this.routes.asObservable();

  constructor() {}

  changeDate(date: Date) {
    this.date.next(date);
  }

  setRoutes(routes: Object){
    this.routes.next(routes);
  }

}
