"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import { useAuth } from "../components/AuthProvider"; // Adjust the path as needed
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import styles from "./navbar.module.css";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <Box>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar>
          <Box className={styles.flexGrow}>
           
          </Box>
          {user && (
            <div>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="account-menu"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt={user.displayName} src={user.photoURL} />
              </IconButton>
              <Menu
                id="account-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                className={styles.menu}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => router.push("/pantries")}>
                  <Avatar /> My Pantries
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                  <Avatar /> Log out
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
