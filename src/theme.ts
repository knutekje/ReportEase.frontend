import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00ADB5', // Soft Teal
        },
        secondary: {
            main: '#FF5722', // Warm Orange
        },
        background: {
            default: '#121212', // Deep Charcoal
            paper: '#1E1E1E', // Medium Gray for surfaces
        },
        text: {
            primary: '#FFFFFF', // White for primary text
            secondary: '#B0BEC5', // Light Gray for secondary text
        },
        error: {
            main: '#F44336', // Soft Red for errors
        },
        info: {
            main: '#2196F3', // Cool Blue for accents
        },
    },
    typography: {
        fontFamily: "'Inter', sans-serif", // Modern font for clean aesthetics
    },
    shape: {
        borderRadius: 12, // Rounded corners for a softer, modern look
    },
});

export default theme;
