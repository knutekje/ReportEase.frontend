import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";

const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuItems = [
        { label: 'Home', link: '#' },
        { label: 'Food Waste', link: '/foodwaste' },
        { label: 'Food Waste List', link: '/foodwastelist' },
    ];

    return (
        <AppBar position="static" sx={{ bgcolor: 'primary.dark', borderRadius: 1 }}>
            <Toolbar>
                {/* Brand Logo */}
                <Typography
                    variant="h6"
                    component="a"
                    href="#"
                    sx={{
                        textDecoration: 'none',
                        flexGrow: 1,
                        color: 'inherit',
                        fontWeight: 'bold',
                    }}
                >
                    ReportEase
                </Typography>
w
                {/* Desktop Navigation */}
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {menuItems.map((item) => (
                        <Button>
                            <Link to={item.link}>{item.label}</Link>
                        </Button>
                    ))}
                </Box>

                {/* Mobile Navigation */}
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {menuItems.map((item) => (
                            <MenuItem
                                key={item.label}
                                onClick={handleMenuClose}
                                component="a"
                                href={item.link}
                            >
                                {item.label}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
