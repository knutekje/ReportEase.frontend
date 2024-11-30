import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import BooleanToggle from "../../components/BooleanToggle.tsx";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const TemperatureReadingForm = () => {
    const [formData, setFormData] = useState({
        submittedBy: "",
        timeRead: "",
        dateRead: "",
        unit: "",
        temperature: "",
        withinLimits: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/temperature-readings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error("Failed to submit temperature reading");
            alert("Temperature reading submitted successfully!");
        } catch (error) {
            console.error("Error submitting temperature reading:", error);
            alert("Failed to submit temperature reading");
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 500,
                mx: "auto",
                mt: 4,
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                bgcolor: "background.paper",
            }}
        >
            <Typography variant="h5" sx={{ mb: 3 }}>
                Submit Temperature Reading
            </Typography>

            <TextField
                label="Submitted By"
                name="submittedBy"
                value={formData.submittedBy}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Time Read"
                type="time"
                name="timeRead"
                value={formData.timeRead}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Date Read"
                type="date"
                name="dateRead"
                value={formData.dateRead}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Temperature"
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />

            <BooleanToggle
                label="Within Limits"
                value={formData.withinLimits}
                onChange={(value) =>
                    setFormData((prev) => ({ ...prev, withinLimits: value }))
                }
            />

            <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                sx={{ bgcolor: "primary.main", color: "white" }}
            >
                Submit
            </Button>
        </Box>
    );
};
export default TemperatureReadingForm;