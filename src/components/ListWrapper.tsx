import React from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Select,
  MenuItem,
} from "@mui/material";
import { API_ADDRESS } from "../constants";

export interface IListWrapper {
  children?: JSX.Element | JSX.Element[];
}
const ListWrapper: React.FC<IListWrapper> = ({ children }: IListWrapper) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default ListWrapper;
