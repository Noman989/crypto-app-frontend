import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import CheckBalance from "./pages/CheckBalance";
import SendCrypto from "./pages/SendCrypto";
import Erc20Tokens from "./pages/Erc20Tokens";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserPage from "./pages/UserPage";
import { UserContext } from "./context";
import { API_ADDRESS } from "./constants";

function App() {
  const location = useLocation();
  const nav = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(location.pathname);
  const [etherBackend, setEtherBackend] = React.useState("ethersjs");
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  React.useEffect(() => {
    if (!userContext.user) {
      (async () => {
        console.log("making request");
        const res = await fetch(`${API_ADDRESS}/auth/user`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:5000",
          },
        });
        if (res.status === 200) {
          const json = await res.json();
          console.log(json);
          userContext.user = {
            name: json.user.name,
            private_key: json.user.private_key,
            username: json.user.username,
            wallet_address: json.user.wallet_address,
          };
          nav("/user");
        }
      })();
    }
  }, []);



  const getButtonColor = (path: string) => {
    return currentPage === path ? "primary" : "inherit";
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "#efefef",
      }}
    >
      <AppBar color="inherit" variant="outlined" position="static">
        <Toolbar sx={{ gap: 4 }}>
          {userContext.user ? (
            <React.Fragment>
              <Typography variant="h6" component="div">
                Crypto App
              </Typography>
              <Button
                color={getButtonColor("/")}
                onClick={() => {
                  nav("/");
                }}
              >
                Check Balance
              </Button>
              <Button
                color={getButtonColor("/send")}
                onClick={() => {
                  nav("/send");
                }}
              >
                Send Crypto
              </Button>
              <Button
                color={getButtonColor("/erc20tokens")}
                onClick={() => {
                  nav("/erc20tokens");
                }}
              >
                ERC 20 TOKENS
              </Button>
              <Box sx={{ flexGrow: 1, textAlign: "right" }}>
                <Button
                  color={getButtonColor("/user")}
                  onClick={() => {
                    nav('/user')
                  }}
                >{userContext.user.username}</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ flexGrow: 1 }} variant="h6" component="div">
                Crypto App
              </Typography>
              <Button
                color={getButtonColor("/")}
                onClick={() => {
                  nav("/");
                }}
              >
                Login
              </Button>
              <Button
                color={getButtonColor("/signup")}
                onClick={() => {
                  nav("/signup");
                }}
              >
                Sign Up
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        {userContext.user ? (
          <Routes>
            <Route path="/" element={<CheckBalance />}></Route>
            <Route path="/send" element={<SendCrypto />}></Route>
            <Route path="/erc20tokens" element={<Erc20Tokens />}></Route>
            <Route path="/user" element={<UserPage />}></Route>
            <Route
              path="*"
              element={<Typography variant="h1">404 not found</Typography>}
            ></Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
            <Route
              path="*"
              element={<Typography variant="h1">404 not found</Typography>}
            ></Route>
          </Routes>
        )}
      </Box>
    </Box>
  );
}

export default App;
