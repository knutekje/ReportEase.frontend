import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { DeleteButton } from "./DeleteButton";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const DiscrepancyItem = ({ discrepancy, onDelete }) => {
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
                <Typography variant="h6">Severity: {discrepancy.severity}</Typography>
                <Typography>Status: {discrepancy.status}</Typography>
                <Typography>Reported By: {discrepancy.reportedBy}</Typography>
                <Typography>Category: {discrepancy.category}</Typography>
                <Typography>Description: {discrepancy.description}</Typography>
                <Typography>
                    Temporary Solution: {discrepancy.tempSolution || "None"}
                </Typography>
            </CardContent>
            <Box>
                {discrepancy.photoId && (
                    <img
                        src={`${BASE_URL}/api/photos/download/${discrepancy.photoId}`}
                        alt="Discrepancy Photo"
                        width={100}
                        height={100}
                        style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                )}
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(discrepancy.id)}
                >
                    Delete
                </Button>
            </Box>
        </Card>
    );
};
