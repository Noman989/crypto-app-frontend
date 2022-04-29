import React from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { API_ADDRESS } from "../constants";
import { UserContext } from '../context';

const SendCrypto: React.FC = () => {
  const [fromAddress, setFromAddress] = React.useState<string | undefined>("");
  const [privateKey, setPrivateKey] = React.useState<string | undefined>("");
  const [toAddress, setToAddress] = React.useState<string | undefined>("");
  const [valueInEter, setValueInEther] = React.useState<
    string | number | undefined
  >(0);
  const [chain, setChain] = React.useState<string>("ropsten");

  const [sending, setSending] = React.useState<boolean>(false);
  const [snackOpen, setSnackOpen] = React.useState<boolean>(false);
  const [sendingSuccess, setSendingSuccess] = React.useState<boolean>(false);

  const userContext = React.useContext(UserContext);

  const sendEther = () => {
    if (!userContext.user) return alert('User not logged in');
    else if(userContext.user)
    (async () => {
      try {
        setSending(true);
        const res = await fetch(`${API_ADDRESS}/api/sendether`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: userContext.user?.wallet_address,
            to: toAddress,
            privateKey: userContext.user?.private_key,
            chain: chain,
            amount_in_ether: valueInEter,
          }),
        });
  
        const json = await res.json();
        if (json.status === 'ok') setSendingSuccess(true); else setSendingSuccess(false);
        setSending(false);
        setSnackOpen(true);
      } catch (err) {
        console.log(err)
        setSendingSuccess(false);
      }
    })();
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
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
        SEND ETHEREUM
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
        {/* <TextField
          value={fromAddress}
          onChange={(e) => setFromAddress(e.currentTarget.value)}
          fullWidth
          label="From Address"
          placeholder="Address"
          variant="outlined"
        />
        <TextField
          value={privateKey}
          onChange={(e) => setPrivateKey(e.currentTarget.value)}
          fullWidth
          label="Private Key"
          placeholder="Private Key"
          variant="outlined"
        /> */}
        <TextField
          value={toAddress}
          onChange={(e) => setToAddress(e.currentTarget.value)}
          fullWidth
          label="To Address"
          placeholder="Address"
          variant="outlined"
        />
        <TextField
          value={valueInEter}
          onChange={(e) => setValueInEther(e.currentTarget.value)}
          fullWidth
          label="Value In Ether"
          placeholder="Value"
          variant="outlined"
          type={"number"}
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
          disabled={sending}
          onClick={() => {
            sendEther();
          }}
          fullWidth
          size="large"
          variant="contained"
        >
          {sending ? (
            <>
              <span style={{ paddingRight: "20px" }}>Sending</span>{" "}
              <CircularProgress size={20} />
            </>
          ) : (
            <span>Send</span>
          )}
        </Button>
        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          // action={action}
        >
          {sendingSuccess ? (
            <Alert> Sent</Alert>
          ) : (
            <Alert color="error"> Error</Alert>
          )}
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default SendCrypto;
 