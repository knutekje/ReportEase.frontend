import { Card, CardContent, Typography, Box, Button } from "@mui/material";

export const TemperatureReadingItem = ({ reading, onDelete }) => {
    return (
        <Card
            sx={{
                margin: "16px 0",
                padding: 2,
                borderRadius: 2,
                boxShadow: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <CardContent>
                <Typography variant="h6">Unit: {reading.unit}</Typography>
                <Typography>Temperature: {reading.temperature}°C</Typography>
                <Typography>Within Limits: {reading.withinLimits ? "Yes" : "No"}</Typography>
                <Typography>Submitted By: {reading.submittedBy}</Typography>
                <Typography>Time Read: {reading.timeRead}</Typography>
                <Typography>Date Read: {reading.dateRead}</Typography>
            </CardContent>
            <Box>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(reading.id)}
                >
                    Delete
                </Button>
            </Box>
        </Card>
    );
};
export default TemperatureReadingItem;