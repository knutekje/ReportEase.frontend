import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                color: 'text.secondary',
                textAlign: 'center',
                py: 2,
                mt: 'auto',
                borderRadius: 1,
                mx: 2,
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} ReportEase. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
