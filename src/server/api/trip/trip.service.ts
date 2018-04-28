import {TripStore} from './trip.store';

export class TripService {
  async getTripById(tripId: number, query?: Array<any>) {
    const tripResult =  await new TripStore().getTripById(tripId);
    return tripResult[0];
  }

  async getTrips(query?: Array<any>) {
    return await new TripStore().getTrips(query);
  }

  async getRoutes(tripId: number) {
    return await new TripStore().getRoutes(tripId);
  }

  async getRouteById(id: number) {
    return await new TripStore().getRouteById(id);
  }
}
