import React, { useMemo } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { IRoute } from "../../utils/http/types";
import moment from "moment";
import { getHumanizedDuration } from "../../utils/datetime";

export enum RouteTimelineItemType {
  departure = "departure",
  arrival = "arrival",
  waiting = "waiting",
  in_road = "in_road",
}

const getTimelineItemIcon = (iconType: RouteTimelineItemType) => {
  switch (iconType) {
    case RouteTimelineItemType.arrival:
      return <TimelineDot />;
    case RouteTimelineItemType.departure:
      return <TimelineDot />;
    case RouteTimelineItemType.waiting:
      return (
        <TimelineDot style={{ margin: 0 }}>
          <HourglassTopIcon fontSize="small" />
        </TimelineDot>
      );
    case RouteTimelineItemType.in_road:
      return (
        <TimelineDot style={{ margin: 0 }}>
          <AccessTimeIcon fontSize="small" />
        </TimelineDot>
      );

    default:
      break;
  }
};

export interface IRouteTimelineItemProps {
  textLeft: string;
  textRight: string;
  iconType: RouteTimelineItemType;
  connector?: boolean;
}

export const RouteTimelineItem: React.FC<IRouteTimelineItemProps> = ({
  textLeft,
  textRight,
  iconType,
  connector = true,
}) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent>{textLeft}</TimelineOppositeContent>

      <TimelineSeparator>
        {getTimelineItemIcon(iconType)}
        {connector && <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: "1rem" }}
      >
        {textRight || "—"}
      </TimelineContent>
    </TimelineItem>
  );
};

export interface IRouteTimelineProps {
  route: IRoute;
}

export const RouteTimeline: React.FC<IRouteTimelineProps> = ({ route }) => {
  const timelineItems = useMemo(() => {
    return route.points.reduce((sum, point, index) => {
      // Время прибытия
      if (point.timeArrival) {
        sum.push({
          textLeft: `Прибытие в город ${point.name}`,
          textRight: moment(point.timeArrival).format("DD.MM.YYYY, HH:mm"),
          iconType: RouteTimelineItemType.arrival,
        });
      }

      // Время стоянки
      if (point.timeArrival && point.timeDeparture) {
        const arrival = moment(point.timeArrival);
        const departure = moment(point.timeDeparture);
        const duration = moment.duration(departure.diff(arrival));
        sum.push({
          textLeft: `Время стоянки`,
          textRight: getHumanizedDuration(duration),
          iconType: RouteTimelineItemType.waiting,
        });
      }

      // Время отбытия
      if (point.timeDeparture) {
        sum.push({
          textLeft: `Отбытие из города ${point.name}`,
          textRight: moment(point.timeDeparture).format("DD.MM.YYYY, HH:mm"),
          iconType: RouteTimelineItemType.departure,
        });
      }

      // Время в пути
      const nextPoint = route.points[index + 1];
      if (nextPoint) {
        const arrival = moment(nextPoint.timeArrival);
        const departure = moment(point.timeDeparture);
        const duration = moment.duration(arrival.diff(departure));
        sum.push({
          textLeft: `Время в пути`,
          textRight: getHumanizedDuration(duration),
          iconType: RouteTimelineItemType.in_road,
        });
      }
      return sum;
    }, [] as IRouteTimelineItemProps[]);
  }, [route]);

  return (
    <Timeline>
      {timelineItems.map((it, index) => (
        <RouteTimelineItem
          key={index}
          connector={index !== timelineItems.length - 1}
          {...it}
        />
      ))}
    </Timeline>
  );
};

export default RouteTimeline;
