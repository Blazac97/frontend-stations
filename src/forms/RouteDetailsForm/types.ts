import { Moment } from "moment";

export interface IRouteDetailsFormValues {
  name: string;
  points: {
    id?: number;
    name: string;
    timeDeparture: null | Moment;
    timeArrival: null | Moment;
  }[];
}
