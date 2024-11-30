import React, { useState } from "react";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SettingsIcon from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import ErrorIcon from "@mui/icons-material/Error";
import { Link } from "react-router-dom";
import logo from "/src/assets/images/ReportEase_Logo_Navbar.png"; // Path to your logo

const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [hoveredMenu, setHoveredMenu] = useState<null | string>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const features = [
     /*   { label: "Admin", link: "/admin", icon: <SupervisorAccountIcon fontSize="small" /> },
        { label: "Settings", link: "/settings", icon: <SettingsIcon fontSize="small" /> },*/
        {
            label: "Food Waste",
            icon: <RestaurantMenuIcon fontSize="small" />,
            links: [
                { label: "Form", link: "/foodwaste" },
                { label: "List", link: "/foodwastelist" },
            ],
        },
        {
            label: "Discrepancy",
            icon: <ErrorIcon fontSize="small" />,
            links: [
                { label: "Form", link: "/discrepancy" },
                { label: "List", link: "/discrepancylist" },
            ],
        },
        {
            label: "Temperature",
            icon: <ThermostatIcon fontSize="small" />,
            links: [
                { label: "Form", link: "/tempform" },
                { label: "List", link: "/templist" },
            ],
        },
    ];

    return (
        <AppBar
            position="sticky"
            sx={{
                bgcolor: "#1E1E2F", // Dark slate blue background
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
                padding: "8px 0",
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {/* Home Button with Logo and Name */}
                <Button
                    component={Link}
                    to="/"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        textTransform: "none",
                        color: "#FFFFFF",
                        textDecoration: "none",
                        fontWeight: "bold",
                        "&:hover": {
                            color: "#FF867C", // Light coral hover effect
                        },
                    }}
                >
                    <img
                        src={logo}
                        alt="ReportEase Logo"
                        style={{ width: "40px", height: "40px", marginRight: "8px" }}
                    />
                    <Typography variant="h6">ReportEase</Typography>
                </Button>

                {/* Navigation Links */}
                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        gap: 3,
                        marginTop: "8px",
                    }}
                >
                    {features.map((feature) => (
                        <Box
                            key={feature.label}
                            sx={{
                                position: "relative",
                                "&:hover .dropdown": {
                                    display: "block",
                                },
                            }}
                        >
                            {/* Parent Button */}
                            <Button
                                startIcon={feature.icon}
                                sx={{
                                    color: "#FFFFFF",
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    "&:hover": {
                                        color: "#FF867C",
                                    },
                                }}
                            >
                                {feature.label}
                            </Button>

                            {/* Dropdown Menu */}
                            <Box
                                className="dropdown"
                                sx={{
                                    display: "none",
                                    position: "absolute",
                                    top: "100%",
                                    left: "0",
                                    bgcolor: "#1E1E2F",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                                    borderRadius: "8px",
                                    zIndex: 10,
                                    padding: "8px",
                                }}
                            >
                                {feature.links.map((link) => (
                                    <MenuItem
                                        key={link.label}
                                        component={Link}
                                        to={link.link}
                                        sx={{
                                            color: "#FFFFFF",
                                            "&:hover": {
                                                bgcolor: "#FF867C",
                                                color: "#FFFFFF",
                                            },
                                        }}
                                    >
                                        {link.label}
                                    </MenuItem>
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Mobile Navigation */}
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
                        sx={{
                            "& .MuiPaper-root": {
                                bgcolor: "#1E1E2F",
                                color: "#FFFFFF",
                            },
                        }}
                    >
                        {features.map((feature) => (
                            <MenuItem
                                key={feature.label}
                                onClick={handleMenuClose}
                                sx={{
                                    "&:hover": {
                                        bgcolor: "#FF867C",
                                        color: "#FFFFFF",
                                    },
                                }}
                            >
                                <Link
                                    to={feature.links[0].link}
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                                    {feature.icon} {feature.label}
                                </Link>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        gap: 3,
                        marginTop: "8px",
                    }}
                >
                    {features.map((item) => (
                        <Button
                            key={item.label}
                            component={Link}
                            to={item.link}
                            startIcon={item.icon}
                            sx={{
                                color: "#FFFFFF",
                                textTransform: "none",
                                fontWeight: "bold",
                                "&:hover": {
                                    color: "#FF867C",
                                },
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Box>;
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
