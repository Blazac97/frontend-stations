import { Container, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useRouteDetails } from "../../hooks/queries/useRouteDetails";
import RouteTimeline from "../../containers/RouteTimeline";
import Error from "../../components/Error";
import { useMemo } from "react";
import moment from "moment";
import { getHumanizedDuration } from "../../utils/datetime";

export interface IRouteDetailsPageProps {}

export const RouteDetailsPage: React.FC<IRouteDetailsPageProps> = () => {
  const { routeId } = useParams();

  const { data, isLoading, error } = useRouteDetails(routeId);

  const shouldRenderTimeline = useMemo(
    () => Number(data?.data?.points?.length) > 1,
    [data]
  );

  const totalDurationStr = useMemo(() => {
    if (!data?.data) return null;
    const { points } = data.data;
    if (!points.length) return null;

    const startTime = moment(points[0].timeDeparture);
    const finishTime = moment(points[points.length - 1].timeArrival);
    const duration = moment.duration(finishTime.diff(startTime));
    return getHumanizedDuration(duration);
  }, [data]);

  return (
    <Container maxWidth="sm" sx={{ padding: "32px" }}>
      <Typography variant="h5" sx={{ marginBottom: "16px" }}>
        Маршрут: {data?.data.name}
      </Typography>

      {isLoading && <CircularProgress size={32} />}
      {error && <Error>{error.message}</Error>}
      {shouldRenderTimeline ? (
        <RouteTimeline route={data!.data} />
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Пункты маршрута отсутствуют
        </Typography>
      )}
      {totalDurationStr && (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Время в пути: {totalDurationStr}
        </Typography>
      )}
    </Container>
  );
};

export default RouteDetailsPage;
