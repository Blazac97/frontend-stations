import {
  Container,
  Typography,
  CircularProgress,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useRoutes } from "../../hooks/queries/useRoutes";
import Error from "../../components/Error";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteRoute } from "../../hooks/mutations/useDeleteRoute";

export interface IRoutesListPageProps {}

export const RoutesListPage: React.FC<IRoutesListPageProps> = () => {
  const { data, isLoading, error } = useRoutes();
  const { mutateAsync, isPending } = useDeleteRoute();

  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ padding: "32px" }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: "16px", textAlign: "center" }}
      >
        Список маршрутов
      </Typography>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Box
          sx={{
            width: "100%",
            marginBottom: "16px",
            borderRadius: "4px",
          }}
        >
          {isLoading && <CircularProgress size={32} />}
          {data && (
            <List
              sx={{
                width: "100%",
                gap: 1,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              {data.data.map((it, index) => (
                <ListItem
                  key={it.id}
                  sx={{
                    bgcolor: "background.paper",
                  }}
                >
                  <Link to={`/routes/${it.id}`} style={{ flex: 1 }}>
                    <ListItemButton>
                      <ListItemText primary={it.name} />
                    </ListItemButton>
                  </Link>
                  <IconButton
                    disabled={isPending}
                    onClick={() => navigate(`/routes/${it.id}/edit`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    disabled={isPending}
                    onClick={() => mutateAsync(it.id.toString())}
                  >
                    <DeleteForeverIcon color="error" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
          {error && <Error>{error.message}</Error>}
        </Box>

        <Link to="/routes/create">
          <Button variant="contained" sx={{ minWidth: "150px" }}>
            Создать маршрут
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default RoutesListPage;
