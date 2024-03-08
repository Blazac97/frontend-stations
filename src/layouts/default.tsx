import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AppBar from "../components/AppBar";

export const DefaultLayout = () => {
  return (
    <Box>
      <AppBar />
      <Outlet />
    </Box>
  );
};
