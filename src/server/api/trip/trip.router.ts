import { TripController } from './trip.controller';
import { Router } from 'express';

const TripRouter: Router = Router();

TripRouter.get('/', TripController.getTrips);
TripRouter.get('/:trip_id', TripController.getTripById);
TripRouter.get('/:trip_id/routes', TripController.getRoutesByTripId);
TripRouter.get('/:trip_id/routes/:route_id', TripController.getRouteById);

export default TripRouter;
