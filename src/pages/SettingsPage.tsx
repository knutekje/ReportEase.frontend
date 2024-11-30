import React from "react";
import { Box, Typography } from "@mui/material";

const SettingsPage: React.FC = () => {
    return (
        <Box
            sx={{
                padding: 3,
                bgcolor: "background.paper",
                boxShadow: 3,
                borderRadius: 2,
                margin: "20px auto",
                maxWidth: "800px",
            }}
        >
            <Typography variant="h4" sx={{ mb: 3 }}>
                Settings
            </Typography>
            <Typography variant="body1" color="text.secondary">
                This is the Settings page where you can configure application preferences. More features will be added soon.
            </Typography>
        </Box>
    );
};

export default SettingsPage;
