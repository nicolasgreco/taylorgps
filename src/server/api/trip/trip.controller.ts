import {Request, Response, NextFunction} from 'express';
import {TripService} from './trip.service';
import {Route} from './route.entity';


export class TripController {
  public static async getTripById(request: Request, response: Response, next: NextFunction) {
    try {
      const tripId = request.params.trip_id;
      const trip = await new TripService().getTripById(tripId);

      response.json(trip);
    } catch (err) {
      next(err);
    }
  }

  public static async getTrips(request: Request, response: Response, next: NextFunction) {
    try {
      const trips = await new TripService().getTrips();
      response.json(trips);
    } catch (err) {
      next(err);
    }
  }

  public static async getRoutesByTripId(request: Request, response: Response, next: NextFunction) {
    try {
      const tripId = request.params.trip_id;
      const routes: Array<Route>  = await new TripService().getRoutes(tripId);
      response.json(routes);
    } catch (err) {
      next(err);
    }
  }

  public static async getRouteById(request: Request, response: Response, next: NextFunction) {
    try {
      const routeId = request.params.route_id;
      const route: Array<Route> = await new TripService().getRouteById(routeId);
      response.json(route[0]);
    } catch (err) {
      next(err);
    }
  }
}
