import { Typography } from "@mui/material";

export interface IErrorProps {
  children?: React.ReactNode;
}

export const Error: React.FC<IErrorProps> = ({ children }) => {
  return (
    <Typography variant="body1" sx={{ color: "red", padding: "24px" }}>
      {children}
    </Typography>
  );
};

export default Error;
