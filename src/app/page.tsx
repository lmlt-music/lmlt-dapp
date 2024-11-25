"use client";

import Image from "next/image";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Toolbar, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { ethers, formatUnits } from "ethers";

export default function Page() {
  const [currentPrice, setCurrentPrice] = useState<string>("Loading...");
  const [totalLiquidity, setTotalLiquidity] = useState<string>("Loading...");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchOnChainData = async () => {
      try {
        // Connect to the Base mainnet provider
        const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");

        // Define the LMLT-ETH pair contract
        const lmltEthPairContract = new ethers.Contract(
          "0xb9ccd0da26abdb3b15f409456f9de17b119cbd8f", // LMLT-ETH Pair
          [
            "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
          ],
          provider
        );

        // Fetch reserves for LMLT-ETH pair
        const [reserve0, reserve1] = await lmltEthPairContract.getReserves();

        // Convert reserves to human-readable numbers
        const reserve0Number = parseFloat(formatUnits(reserve0, 18)); // LMLT
        const reserve1Number = parseFloat(formatUnits(reserve1, 18)); // ETH

        // Use fallback ETH price in USDT (or USDC) if fetching ETH price fails
        const ethPriceInUsdc = 3300; // Fallback value in case of error

        // Calculate LMLT price in USDT
        const lmltPriceInUsdt = (reserve0Number / reserve1Number) * ethPriceInUsdc;

        // Calculate total liquidity in USDT
        const liquidityInUsdt = reserve0Number * lmltPriceInUsdt;

        // Update state
        setCurrentPrice(lmltPriceInUsdt.toFixed(6)); // Display price with 6 decimal places
        setTotalLiquidity(liquidityInUsdt.toLocaleString()); // Format liquidity as a readable string
      } catch (error) {
        console.error("Error fetching on-chain data:", error);

        // Fallback values
        setCurrentPrice("Fallback Price");
        setTotalLiquidity("Fallback Liquidity");
      }
    };

    fetchOnChainData();
  }, []);

  return (
    <>
      <main style={{ background: "#1e0739", color: "#ffffff", minHeight: "100vh" }}>
        {/* Header */}
        <Box padding={4} textAlign="center">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Revolutizing music through <span style={{ color: "#ff4ddb" }}>algorithmic</span> artist discovery.
          </Typography>
          <Typography variant="body1" maxWidth="sm" margin="auto" gutterBottom>
            Limelight is a music protocol that offers a balanced token economy for artists, producers, music influencers, and fans
            to participate in an ecosystem whose goal is to push good music.
          </Typography>
        </Box>

        {/* Buttons */}
        <Box textAlign="center" marginY={4}>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "0 10px", backgroundColor: "#ff4ddb", borderRadius: "20px", padding: "10px 20px" }}
          >
            Music Platform
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: "0 10px", backgroundColor: "#4a90e2", borderRadius: "20px", padding: "10px 20px" }}
          >
            LMLT -&gt; CLOUT Staking
          </Button>
        </Box>

        {/* Main Visual */}
        <Box display="flex" justifyContent="center" alignItems="center" marginBottom={4}>
          <Image src="/path-to-image.png" alt="Main Visual" width={500} height={300} />
        </Box>

        {/* Stats Section */}
        <Container maxWidth="lg" style={{ background: "#2a064d", borderRadius: "10px", padding: "20px", marginBottom: "20px" }}>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={4} textAlign="center">
              <Typography variant="h4" fontWeight="bold" style={{ color: "#ffffff" }}>
                8,001%
              </Typography>
              <Typography variant="subtitle1" style={{ color: "#ffffff" }}>
                Annual Percentage Yield
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="center">
              <Typography variant="h4" fontWeight="bold" style={{ color: "#ffffff" }}>
                ${currentPrice}
              </Typography>
              <Typography variant="subtitle1" style={{ color: "#ffffff" }}>
                Current Price (USDT)
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="center">
              <Typography variant="h4" fontWeight="bold" style={{ color: "#ffffff" }}>
                ${totalLiquidity}
              </Typography>
              <Typography variant="subtitle1" style={{ color: "#ffffff" }}>
                Total Liquidity
              </Typography>
            </Grid>
          </Grid>
        </Container>

        {/* Footer */}
        <Box textAlign="center" padding={2}>
          <Typography variant="body2" style={{ color: "#ffffff" }}>
            Powered by <span style={{ color: "#6a29b9" }}>Polygon</span>
          </Typography>
        </Box>

        {/* Profile with Buy Link */}
        <Toolbar sx={{ justifyContent: "flex-end", bgcolor: "#1e0739", color: "white", padding: 2 }}>
          <IconButton onClick={handleMenuClick}>
            <Avatar alt="Bilal" src="/path-to-avatar.png" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem component="a" href="https://app.uniswap.org/swap?chain=base&outputCurrency=0x041040e0a67150bcaf126456b52751017f1c368e" target="_blank">
              Buy LMLT
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </main>
    </>
  );
}