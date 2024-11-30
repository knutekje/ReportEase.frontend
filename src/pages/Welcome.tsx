import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";

export const Welcome = () => {



        return (
            <Box
                sx={{
                    maxWidth: 500,
                    mx: "auto",
                    mt: 4,
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
                    bgcolor: "#1E1E2F", // Dark slate blue background
                    border: "2px solid #FF6F61", // Coral border
                }}>

                <Typography>
                    Welcome
                </Typography>
            </Box>
        )
    };



