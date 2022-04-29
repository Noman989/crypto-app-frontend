import React from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import { UserContext } from '../context';
import { API_ADDRESS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const LoginPage: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const userContext = React.useContext(UserContext);
  const [cookies, setCookies] = useCookies(['token']);
  const nav = useNavigate();

  const login = async () => {
    try {
      const res = await fetch(`${API_ADDRESS}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })

      if (res.status === 400) alert('username or password do not match');
      else if (res.status === 200) {
        alert('Successfully Logged In');
        const json = await res.json();
        userContext.user = {
          name: json.user.name,
          private_key: json.user.private_key,
          username: json.user.username,
          wallet_address: json.user.wallet_address
        }
        setCookies('token', json.token, { path: '/', maxAge: 86_400_000});
      }
    } catch (err) {
      alert(err);
    }
  }

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
        LOGIN
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
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          fullWidth
          id="outlined-basic"
          label="Username"
          placeholder="Username"
          variant="outlined"
        />
        <TextField
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          fullWidth
          id="outlined-basic"
          label="Password"
          placeholder="Password"
          variant="outlined"
          type={'password'}
        />

        <Button
          onClick={() => {
            (async () => {
              await login();
              nav('/user');
            })();
          }}
          fullWidth
          size="large"
          variant="contained"
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
