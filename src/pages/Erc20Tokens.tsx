import React from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
//   Avatar,
  Select,
  MenuItem,
} from "@mui/material";
import { API_ADDRESS } from "../constants";
import ListWrapper from "../components/ListWrapper";

const Erc20Tokens: React.FC = () => {
  interface IData {
    name: string;
    totalSupply: string;
    symbol: string;
    decimals: string;
  }
  const [data, setData] = React.useState<IData | null>(null);
  const [address, setAddress] = React.useState<string | undefined>("");
  const [chain, setChain] = React.useState<string>("ropsten");

  const getData = () => {
    (async () => {
      const res = await fetch(
        `${API_ADDRESS}/api/getcontract?address=${address}&chain=${chain}`
      );
      const json = await res.json();
      const data: IData = {
          name: json.data.name,
          totalSupply: json.data.totalSupply,
          symbol: json.data.symbol,
          decimals: json.data.decimals,
      };
      setData(data);
    })();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        ERC 20 TOKENS
      </Typography>
      <Paper
        elevation={2}
        sx={{
          width: 600,
          p: 2,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          value={address}
          onChange={(e) => setAddress(e.currentTarget.value)}
          fullWidth
          id="outlined-basic"
          label="Address"
          placeholder="Address"
          variant="outlined"
        />
        <Select
          value={chain}
          onChange={(e) => {
            setChain(e.target.value);
          }}
        >
          <MenuItem value={"ropsten"}>Ropsten</MenuItem>
          <MenuItem value={"mainnet"}>Mainnet</MenuItem>
        </Select>
        <Button
          onClick={() => {
            getData();
          }}
          fullWidth
          size="large"
          variant="contained"
        >
          Get Data
        </Button>
      </Paper>
      {data && (
        <Paper
          elevation={2}
          sx={{
            width: 600,
            p: 2,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* <ListWrapper>
            <Avatar
              alt="E"
              sx={{ width: "40px", height: "40px" }}
              src="https://avatars.dicebear.com/api/micah/s.svg?background=%23000000"
            />
            <Typography variant="subtitle1">{data.address}</Typography>
          </ListWrapper> */}
          <ListWrapper>
            <Typography variant="subtitle1">
              <b>Name :</b>
            </Typography>
            <Typography variant="subtitle1">{data.name}</Typography>
          </ListWrapper>
          <ListWrapper>
            <Typography variant="subtitle1">
              <b>Symbol :</b>
            </Typography>
            <Typography variant="subtitle1">{data.symbol}</Typography>
          </ListWrapper>
          <ListWrapper>
            <Typography variant="subtitle1">
              <b>Total Supply :</b>
            </Typography>
            <Typography variant="subtitle1">{data.totalSupply}</Typography>
          </ListWrapper>
          <ListWrapper>
            <Typography variant="subtitle1">
              <b>Decimals :</b>
            </Typography>
            <Typography variant="subtitle1">{data.decimals}</Typography>
          </ListWrapper>
        </Paper>
      )}
    </Box>
  );
};

export default Erc20Tokens;
