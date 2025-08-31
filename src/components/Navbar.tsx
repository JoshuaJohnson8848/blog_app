'use client';

import { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Container,
  Box,
  Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '@/hooks/useAuth';
import { confirm } from 'material-ui-confirm';

export default function Navbar() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logout, loading } = useAuth();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    const userName = localStorage.getItem('user_name');
    if (userRole && userName) {
      try {
        setUser({ name: userName || 'User', role: userRole });
      } catch (error) {
        console.log(error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogout = async () => {
    const { confirmed } = await confirm({
      title: "Do you want to logout ?",
      description: "This action cannot be undone.",
      confirmationText: "Yes, Logout",
      cancellationText: "Cancel",
    });

    if (confirmed) {

      logout();
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ mb: 4, backgroundColor: '#fff' }}>
      {!loading && <Container maxWidth="xl">
        <Toolbar className="ml-[130px]" disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
            <Link href="/" color="inherit" underline="hover" sx={{ mx: 1.5 }}>
              Home
            </Link>
            {user && <Link href="/profile" color="inherit" underline="hover" sx={{ mx: 1.5 }}>
              Profile
            </Link>}
            {user?.role === 'admin' && (
              <Link href="/admin/users" color="error" underline="hover" sx={{ mx: 1.5 }}>
                Admin
              </Link>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {user ? (
              <>
                <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                  Hi, {user.name}
                </Typography>
                <Button color="error" onClick={handleLogout} size="small">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" href="/auth/login" size="small">
                  Login
                </Button>
                <Button variant="contained" href="/auth/signup" size="small">
                  Register
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>}

      {!loading && <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link href="/" color="inherit" underline="none">
            Home
          </Link>
        </MenuItem>

        {user && (
          <MenuItem onClick={handleMenuClose}>
            <Link href="/profile" color="inherit" underline="none">
              Profile
            </Link>
          </MenuItem>
        )}

        {user?.role === 'admin' && (
          <MenuItem onClick={handleMenuClose}>
            <Link href="/admin/users" color="error" underline="none">
              Admin
            </Link>
          </MenuItem>
        )}

        {user ? (
          <MenuItem onClick={handleLogout}>
            <Typography color="error">Logout</Typography>
          </MenuItem>
        ) : [
          <MenuItem key="login">
            <Link href="/auth/login" color="inherit" underline="none">
              Login
            </Link>
          </MenuItem>,
          <MenuItem key="register">
            <Link href="/auth/register" color="primary" underline="none">
              Register
            </Link>
          </MenuItem>
        ]}
      </Menu>}
    </AppBar>
  );
}