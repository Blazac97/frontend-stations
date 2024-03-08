import { Container, Typography, Stack, CircularProgress } from "@mui/material";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import RouteDetailsForm from "../../forms/RouteDetailsForm";
import { IRouteDetailsFormValues } from "../../forms/RouteDetailsForm/types";
import { useMemo } from "react";
import { useRouteDetails } from "../../hooks/queries/useRouteDetails";
import Error from "../../components/Error";
import { useUpdateRoute } from "../../hooks/mutations/useUpdateRoute";

export interface IRouteEditPageProps {}

export const RouteEditPage: React.FC<IRouteEditPageProps> = () => {
  const { routeId } = useParams();

  const { data, isLoading, error } = useRouteDetails(routeId);

  const { mutateAsync } = useUpdateRoute();
  const navigate = useNavigate();

  const initialValues: IRouteDetailsFormValues = useMemo(() => {
    return {
      name: data?.data.name || "",
      points:
        data?.data?.points?.map((it) => ({
          id: it.id,
          name: it.name,
          timeArrival: it.timeArrival ? moment(it.timeArrival) : moment(),
          timeDeparture: it.timeDeparture ? moment(it.timeDeparture) : moment(),
        })) || [],
    };
  }, [data]);
  console.log("initialValues: ", initialValues);

  return (
    <Container maxWidth="sm" sx={{ padding: "32px" }}>
      <Typography variant="h4" sx={{ marginBottom: "16px" }}>
        Изменение маршрута: {data?.data?.name}
      </Typography>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        {isLoading && <CircularProgress size={32} />}
        {error && <Error>{error.message}</Error>}
        {initialValues && (
          <RouteDetailsForm
            initialValues={initialValues}
            onSubmit={async (values) => {
              const normalizedData = {
                ...values,
                id: routeId as any,
                points:
                  values?.points?.map(
                    ({ name, timeDeparture, timeArrival }: any) => ({
                      name,
                      timeDeparture: timeDeparture.toISOString(),
                      timeArrival: timeArrival.toISOString(),
                    })
                  ) || [],
              };
              console.log("normalizedData: ", normalizedData);
              await mutateAsync(normalizedData);
              navigate("/routes");
            }}
          />
        )}
      </Stack>
    </Container>
  );
};

export default RouteEditPage;
