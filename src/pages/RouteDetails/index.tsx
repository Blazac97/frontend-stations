import { Container, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useRouteDetails } from "../../hooks/queries/useRouteDetails";
import RouteTimeline from "../../containers/RouteTimeline";
import Error from "../../components/Error";

export interface IRouteDetailsPageProps {}

export const RouteDetailsPage: React.FC<IRouteDetailsPageProps> = () => {
  const { routeId } = useParams();

  const { data, isLoading, error } = useRouteDetails(routeId);

  return (
    <Container maxWidth="sm" sx={{ padding: "32px" }}>
      <Typography variant="h5" sx={{ marginBottom: "16px" }}>
        Маршрут: {data?.data.name}
      </Typography>

      {isLoading && <CircularProgress size={32} />}
      {error && <Error>{error.message}</Error>}
      {data && <RouteTimeline route={data.data} />}
    </Container>
  );
};

export default RouteDetailsPage;
