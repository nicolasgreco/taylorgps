import {getConnection} from 'typeorm';

export class TripStore {
  private connection;

  constructor() {
    this.connection = getConnection();
  }

  async getRouteById(routeId: number, filters?) {
    let params = '';
    if (filters)
      params = 'and ' + filters.join(' and ');
    const rawData = await this.connection.query(`SELECT * FROM booking_routes where id = @0 ${params}`, [routeId]);
    return rawData;
  }

  async getRoutes(tripId: number) {
    const rawData = await this.connection.query(`SELECT * FROM booking_routes where trip_id = @0 order by "order"`, [tripId]);
    return rawData;
  }

  async getTripById(tripId: number) {
    const rawData = await this.connection.query(`SELECT * FROM trips where id = @0`, [tripId]);
    return rawData;
  }

  async getTrips(query?: Array<any>) {
    const rawData = await this.connection.query(`SELECT * FROM trips`);
    return rawData;
  }

  async getPointsByRouteId(routeId: number) {
    const rawData = await this.connection.query(`SELECT * FROM route_points where route_id = @0 order by order`, [routeId]);
    return rawData;
  }
}
