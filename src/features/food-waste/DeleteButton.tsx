import React, { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

interface DeleteButtonProps {
    id: string;
    onDeleteSuccess: () => void; // Callback to inform the parent of successful deletion
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDeleteSuccess }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const DeleteReport = async () => {
        setIsDeleting(true); // Start loading spinner
        try {
            const response = await fetch(`${BASE_URL}/api/food-waste-reports/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                onDeleteSuccess(); // Notify the parent of successful deletion
            } else {
                console.error("Failed to delete the report");
            }
        } catch (error) {
            console.error("Error deleting the report:", error);
        } finally {
            setIsDeleting(false); // Stop loading spinner
        }
    };

    return (
        <Button
            variant="outlined"
            color="error"
            startIcon={!isDeleting ? <DeleteIcon /> : null}
            onClick={DeleteReport}
            disabled={isDeleting} // Disable button while deleting
            sx={{
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                    bgcolor: "#FF867C", // Light coral hover background
                    color: "#FFFFFF", // White text on hover
                },
            }}
        >
            {isDeleting ? <CircularProgress size={20} sx={{ color: "#FF867C" }} /> : "Delete"}
        </Button>
    );
};

