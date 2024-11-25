"use client";

import { AppBar, Box, Container, Toolbar, Button, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { useState, useEffect, MouseEvent } from "react";
import { useMetamask, useAddress, useDisconnect } from "@thirdweb-dev/react";
import { createThirdwebClient, getContract, readContract, defineChain } from "thirdweb";

const LMLT_CONTRACT_ADDRESS = "0x041040e0A67150BCaf126456b52751017f1c368E" as `0x${string}`;
const CLIENT_ID = "a34344b907a4dd3c2811807c82a1b4bd"; // Replace with your actual client ID

// Define Base Mainnet Chain
const chain = defineChain(8453);

// Initialize Thirdweb Client
const client = createThirdwebClient({
  clientId: CLIENT_ID,
});

export default function ProfileAppBar() {
  const [lmltBalance, setLmltBalance] = useState<string>("Loading...");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const fetchBalance = async () => {
    if (!address) return;

    try {
      const contract = getContract({
        client,
        chain,
        address: LMLT_CONTRACT_ADDRESS,
      });

      const balance: bigint = await readContract({
        contract,
        method: "function balanceOf(address who) view returns (uint256)",
        params: [address],
      });

      const formattedBalance = Number(balance) / 1e18; // Convert from BigInt and apply 18 decimals
      setLmltBalance(formattedBalance.toFixed(4)); // Set formatted balance
    } catch (error) {
      console.error("Error fetching LMLT balance:", error);
      setLmltBalance("Error");
    }
  };

  useEffect(() => {
    if (address) {
      fetchBalance(); // Fetch balance only if the wallet is connected
    }
  }, [address]);

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#1e0739",
        color: "white",
        boxShadow: "none",
        paddingY: 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img src="/path-to-logo.png" alt="Limelight Logo" style={{ height: 40 }} />
            <Box fontSize={20} fontWeight="bold">
              limelight <span style={{ fontSize: 12, fontWeight: "normal" }}>beta</span>
            </Box>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: "flex", gap: 4, alignItems: "center", flexGrow: 1, justifyContent: "center" }}>
            <Button href="#discover" sx={{ textTransform: "none", fontWeight: "bold", color: "white" }}>
              Discover
            </Button>
            <Button href="#library" sx={{ textTransform: "none", fontWeight: "bold", color: "white" }}>
              Library
            </Button>
            <Button href="#top-charts" sx={{ textTransform: "none", fontWeight: "bold", color: "white" }}>
              Top Charts
            </Button>
            <Button href="#playlist" sx={{ textTransform: "none", fontWeight: "bold", color: "white" }}>
              Playlist
            </Button>
          </Box>

          {/* Profile Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {!address ? (
              <Button
                variant="contained"
                onClick={connectWithMetamask}
                sx={{ textTransform: "none", fontWeight: "bold", bgcolor: "#ff4ddb", color: "white" }}
              >
                Connect Wallet
              </Button>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={handleMenuClick}>
                <Avatar alt="User" src="/path-to-avatar.png" />
                <Box sx={{ marginLeft: 1, fontWeight: "bold" }}>
                  {address.slice(0, 6)}...{address.slice(-4)}
                </Box>
              </Box>
            )}

            {/* Profile Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ mt: 1 }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {address && (
                <>
                  <MenuItem onClick={handleMenuClose}>
                    <Typography variant="body2" fontWeight="bold">
                      LMLT Balance:
                    </Typography>
                    <Typography variant="body2">{lmltBalance} LMLT</Typography>
                  </MenuItem>
                  <MenuItem onClick={disconnect}>
                    <Typography>Disconnect</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}