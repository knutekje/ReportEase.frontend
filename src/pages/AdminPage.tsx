import React from "react";
import { Box, Typography } from "@mui/material";

const AdminPage: React.FC = () => {
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
                Admin Panel
            </Typography>
            <Typography variant="body1" color="text.secondary">
                This is the Admin Panel where you can manage users, roles, and permissions. More features will be added soon.
            </Typography>
        </Box>
    );
};

export default AdminPage;
