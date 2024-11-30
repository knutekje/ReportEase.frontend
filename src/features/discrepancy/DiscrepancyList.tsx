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

export interface Discrepancy {
    id: string;
    severity: string;
    status: string;
    reportedBy: string;
    category: string;
    department: string;
    description: string;
    tempSolution: string;
    photoId?: string;
    reportedAt: string;
}

export const DiscrepancyList: React.FC = () => {
    const { data: discrepancies = [], refetch, isLoading, isError } = useQuery({
        queryKey: ["discrepancies"],
        queryFn: async (): Promise<Discrepancy[]> => {
            const response = await fetch(`${BASE_URL}/api/discrepancies`);
            if (!response.ok) throw new Error("Failed to fetch discrepancies");
            return response.json();
        },
    });

    const handleDelete = async (id: string) => {
        try {
            await fetch(`${BASE_URL}/api/discrepancies/${id}`, {
                method: "DELETE",
            });
            refetch(); // Refresh the data after deletion
        } catch (error) {
            console.error("Failed to delete discrepancy:", error);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading discrepancies.</p>;

    return (
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Table>
                <TableHead sx={{ bgcolor: "primary.main" }}>
                    <TableRow>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Severity</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Reported By</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Department</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Description</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Temporary Solution</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Reported At</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {discrepancies.map((discrepancy) => (
                        <TableRow key={discrepancy.id}>
                            <TableCell>{discrepancy.severity}</TableCell>
                            <TableCell>{discrepancy.status}</TableCell>
                            <TableCell>{discrepancy.reportedBy}</TableCell>
                            <TableCell>{discrepancy.category}</TableCell>
                            <TableCell>{discrepancy.department}</TableCell>
                            <TableCell>{discrepancy.description}</TableCell>
                            <TableCell>{discrepancy.tempSolution || "None"}</TableCell>
                            <TableCell>{new Date(discrepancy.reportedAt).toLocaleString()}</TableCell>
                            <TableCell>
                                <Tooltip title="Edit">
                                    <IconButton color="primary">
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(discrepancy.id)}
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

export default DiscrepancyList;
