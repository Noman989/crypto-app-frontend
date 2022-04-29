import React from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import { API_ADDRESS } from '../constants';
import { useNavigate } from 'react-router-dom'

const SignUpPage: React.FC = () => {
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [walletAddress, setWalletAddress] = React.useState('');
  const [privateKey, setPrivateKey] = React.useState('');
  const [password, setPassword] = React.useState('');
  const nav = useNavigate();

  const signUp = async () => {
    const res = await fetch(`${API_ADDRESS}/auth/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        wallet_address: walletAddress,
        private_key: privateKey,
        username,
        password,
      })
    })
    if (res.status !== 200) return alert("Could Not create account at this time");
    alert('Successfully created account');
    nav('/'); 
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
        Sign Up
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
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          fullWidth
          id="outlined-basic"
          label="Full Name"
          placeholder="Full Name"
          variant="outlined"
        />
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
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.currentTarget.value)}
          fullWidth
          id="outlined-basic"
          label="Wallet Address"
          placeholder="Wallet Address"
          variant="outlined"
        />
        <TextField
          value={privateKey}
          onChange={(e) => setPrivateKey(e.currentTarget.value)}
          fullWidth
          id="outlined-basic"
          label="Private Key"
          placeholder="Private Key"
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
          type={"password"}
        />

        <Button
          onClick={() => {
            (async () => {
              await signUp();
            })();
          }}
          fullWidth
          size="large"
          variant="contained"
        >
          Sign up
        </Button>
      </Paper>
    </Box>
  );
};

export default SignUpPage;
