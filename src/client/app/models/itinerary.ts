import {Route} from './route';

export class Itinerary {
  date: string;
  routes: Array<Route>;

  constructor(date: string, routes: Array<Route> = new Array<Route>()){
    this.date = date;
    this.routes = routes;
  }
}
