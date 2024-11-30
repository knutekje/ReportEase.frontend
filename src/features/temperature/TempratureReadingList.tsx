import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export interface TemperatureReading {
    id: string;
    submittedBy: string;
    timeRead: string;
    dateRead: string;
    unit: string;
    temperature: number;
    withinLimits: boolean;
}

export const TemperatureReadingList: React.FC = () => {
    const { data: temperatureReadings = [], refetch, isLoading, isError } = useQuery({
        queryKey: ["temperatureReadings"],
        queryFn: async (): Promise<TemperatureReading[]> => {
            const response = await fetch(`${BASE_URL}/api/temperature-readings`);
            if (!response.ok) throw new Error("Failed to fetch temperature readings");
            return response.json();
        },
    });

    const handleDelete = async (id: string) => {
        try {
            await fetch(`${BASE_URL}/api/temperature-readings/${id}`, {
                method: "DELETE",
            });
            refetch(); // Refresh the data after deletion
        } catch (error) {
            console.error("Failed to delete temperature reading:", error);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading temperature readings.</p>;

    return (
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Table>
                <TableHead sx={{ bgcolor: "primary.main" }}>
                    <TableRow>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Unit</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Temperature (°C)</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Within Limits</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Submitted By</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Time Read</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date Read</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {temperatureReadings.map((reading) => (
                        <TableRow key={reading.id}>
                            <TableCell>{reading.unit}</TableCell>
                            <TableCell>{reading.temperature.toFixed(1)}</TableCell>
                            <TableCell>{reading.withinLimits ? "Yes" : "No"}</TableCell>
                            <TableCell>{reading.submittedBy}</TableCell>
                            <TableCell>{new Date(reading.timeRead).toLocaleTimeString()}</TableCell>
                            <TableCell>{new Date(reading.dateRead).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Tooltip title="Edit">
                                    <IconButton color="primary">
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(reading.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TemperatureReadingList;
