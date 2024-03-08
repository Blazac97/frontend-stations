import { Container, Typography, Stack } from "@mui/material";
import { useCreateRoute } from "../../hooks/mutations/useCreateRoute";
import { useNavigate } from "react-router-dom";
import RouteDetailsForm from "../../forms/RouteDetailsForm";
import { IRouteDetailsFormValues } from "../../forms/RouteDetailsForm/types";

const initialValues: IRouteDetailsFormValues = {
  name: "",
  points: [],
};

export interface IRouteCreatePageProps {}

export const RouteCreatePage: React.FC<IRouteCreatePageProps> = () => {
  const { mutateAsync } = useCreateRoute();
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ padding: "32px" }}>
      <Typography variant="h4" sx={{ marginBottom: "16px" }}>
        Создать маршрут
      </Typography>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <RouteDetailsForm
          initialValues={initialValues}
          onSubmit={async (values) => {
            const normalizedData = {
              ...values,
              points: values.points.map(
                ({ name, timeDeparture, timeArrival }: any) => ({
                  name,
                  timeDeparture: timeDeparture.toISOString(),
                  timeArrival: timeArrival.toISOString(),
                })
              ),
            };
            console.log("normalizedData: ", normalizedData);
            await mutateAsync(normalizedData);
            navigate("/routes");
          }}
        />
      </Stack>
    </Container>
  );
};

export default RouteCreatePage;
