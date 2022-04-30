import React from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import { UserContext } from "../context";
import ListWrapper from "../components/ListWrapper";
import { API_ADDRESS } from "../constants";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const UserPage: React.FC = () => {
  interface IData {
    address: string;
    balanceInEther: string;
    balanceInUSD: number;
    balanceInEuro: number;
  }

  const userContext = React.useContext(UserContext);
  const [data, setData] = React.useState<IData | null>(null);
  const [chain, setChain] = React.useState<string>("ropsten");
  const [cookies, setCookies] = useCookies(["token"]);
  const [etherBackend, setEtherBackend] = React.useState("ethersjs");
  const nav = useNavigate();
  
  React.useEffect(() => {
    (async () => {
      const res = await fetch(`${API_ADDRESS}/api/switchbackend`, {
        method: "GET",
      });
      const json = await res.json();
      setEtherBackend(json.backend);
    })();
  }, []);

  const Logout = () => {
    (async () => {
      const res = await fetch(`${API_ADDRESS}/auth/logout`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setCookies("token", "", { maxAge: 0 });
        userContext.user = null;
        nav("/");
      }
      // const json = await res.json();
    })();
  };

  const getData = (address: string | undefined) => {
    if (!address) return 0;
    (async () => {
      const res = await fetch(
        `${API_ADDRESS}/api/getbalance?address=${address}&chain=${chain}`
      );
      const json = await res.json();
      const data: IData = {
        address: json.data.address,
        balanceInEther: json.data.balanceInEther,
        balanceInUSD: json.data.balanceInUSD,
        balanceInEuro: json.data.balanceInEuro,
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
      <Paper
        sx={{
          width: "800px",
          p: 2,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        elevation={4}
      >
        <ListWrapper>
          <Avatar
            alt="E"
            sx={{ width: "80px", height: "80px" }}
            src={`https://avatars.dicebear.com/api/micah/${userContext.user?.wallet_address}.svg?background=%23000000`}
          />
          <Typography variant="subtitle1">
            {userContext.user?.wallet_address}
          </Typography>
        </ListWrapper>
        <ListWrapper>
          <Typography variant="subtitle1">
            <b>Name :</b>
          </Typography>
          <Typography variant="subtitle1">{userContext.user?.name}</Typography>
        </ListWrapper>
        <ListWrapper>
          <Typography variant="subtitle1">
            <b>Username :</b>
          </Typography>
          <Typography variant="subtitle1">
            {userContext.user?.username}
          </Typography>
        </ListWrapper>
        <ListWrapper>
          <Typography variant="subtitle1">
            <b>Private Key :</b>
          </Typography>
          <Typography variant="subtitle1">
            {userContext.user?.private_key}
          </Typography>
        </ListWrapper>
        <ListWrapper>
          <Typography variant="subtitle1">
            <b>Backend :</b>
          </Typography>
          <ToggleButtonGroup
            size={"small"}
            value={etherBackend}
            exclusive
            onChange={(e, val) => {
              (async () => {
                if (val !== null) {
                  const res = await fetch(`${API_ADDRESS}/api/switchbackend`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      backend: val,
                    }),
                  });
                  if (res.status === 200) setEtherBackend(val);
                }
              })();
            }}
            aria-label="text alignment"
          >
            <ToggleButton value="ethersjs" aria-label="left aligned">
              <Typography>Ethers</Typography>
            </ToggleButton>
            <ToggleButton value="web3js" aria-label="centered">
              <Typography>Web3</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </ListWrapper>
        <ListWrapper>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexGrow: 1,
            }}
          >
            <Typography variant="subtitle1">
              <b>Chain :</b>
            </Typography>
            <Select
              sx={{ flexGrow: 1 }}
              value={chain}
              onChange={(e) => {
                setChain(e.target.value);
              }}
            >
              <MenuItem value={"ropsten"}>Ropsten</MenuItem>
              <MenuItem value={"mainnet"}>Mainnet</MenuItem>
            </Select>
          </Box>
          <Button
            variant="text"
            onClick={() => {
              getData(userContext.user?.wallet_address);
            }}
          >
            Get Balance
          </Button>
        </ListWrapper>
        {data && (
          <React.Fragment>
            <ListWrapper>
              <Typography variant="subtitle1">
                <b>Value in ether :</b>
              </Typography>
              <Typography variant="subtitle1">{data.balanceInEther}</Typography>
            </ListWrapper>
            <ListWrapper>
              <Typography variant="subtitle1">
                <b>Value in USD :</b>
              </Typography>
              <Typography variant="subtitle1">{data.balanceInUSD}</Typography>
            </ListWrapper>
            <ListWrapper>
              <Typography variant="subtitle1">
                <b>Value in Euro :</b>
              </Typography>
              <Typography variant="subtitle1">{data.balanceInEuro}</Typography>
            </ListWrapper>
          </React.Fragment>
        )}
        <ListWrapper>
          <Box></Box>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              Logout();
            }}
          >
            Logout
          </Button>
        </ListWrapper>
      </Paper>
    </Box>
  );
};

export default UserPage;
