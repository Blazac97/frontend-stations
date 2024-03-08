export interface IRoutePoint {
  id: number;
  name: string;
  timeDeparture: string | null;
  timeArrival: string | null;
  routeId?: number;
}

export interface IRoute {
  id: number;
  name: string;
  points: IRoutePoint[];
}

export interface ICreateRoutePayload {
  name: string;
  points: Omit<IRoutePoint, "routeId" | "id">[];
}

export interface IUpdateRoutePayload {
  id: number;
  name: string;
  points: {
    name: string;
    timeDeparture: string | null;
    timeArrival: string | null;
  }[];
}
