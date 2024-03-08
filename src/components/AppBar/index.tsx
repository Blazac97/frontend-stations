import {
  AppBar as MUIAppBar,
  Container,
  Toolbar,
  MenuItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IAppBarLinkProps {
  to: string;
  label: string;
}

const AppBarLink: React.FC<IAppBarLinkProps> = ({ to, label }) => {
  const navigate = useNavigate();
  return (
    <MenuItem onClick={() => navigate(to)}>
      <Typography textAlign="center">{label}</Typography>
    </MenuItem>
  );
};

export interface IAppBarProps {}

export const AppBar: React.FC<IAppBarProps> = () => {
  return (
    <MUIAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AppBarLink to="/routes" label="Список маршрутов" />
          <AppBarLink to="/routes/create" label="Создать маршрут" />
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
};

export default AppBar;
