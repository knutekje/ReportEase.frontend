import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EnumSelect from "../../components/EnumSelect";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const severityOptions = ["Low", "Normal", "High", "Critical"];
const statusOptions = ["Open", "Need for Improvement", "Improved", "Closed"];

const DiscrepancyForm: React.FC = () => {
    const [formData, setFormData] = useState({
        severity: "",
        status: "",
        reportedBy: "",
        category: "",
        department: "",
        description: "",
        tempSolution: "",
        file: null as File | null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({
                ...prev,
                file: e.target.files[0],
            }));
        }
    };

    const handleSubmit = async () => {
        const formDataToSend = new FormData();

        // Add JSON as a string
        const reportJson = JSON.stringify({
            severity: formData.severity,
            status: formData.status,
            reportedBy: formData.reportedBy,
            category: formData.category,
            department: formData.department,
            description: formData.description,
            tempSolution: formData.tempSolution,
        });

        formDataToSend.append("ReportJson", reportJson);

        // Add file if it exists
        if (formData.file) {
            formDataToSend.append("File", formData.file);
        }

        try {
            const response = await fetch(`${BASE_URL}/api/discrepancies`, {
                method: "POST",
                body: formDataToSend,
            });

            if (!response.ok) throw new Error("Failed to submit discrepancy");

            alert("Discrepancy submitted successfully!");
        } catch (error) {
            console.error("Error submitting discrepancy:", error);
            alert("Failed to submit discrepancy");
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
                Submit a Discrepancy
            </Typography>

            <EnumSelect
                label="Severity"
                value={formData.severity}
                options={severityOptions}
                onChange={(value) =>
                    setFormData((prev) => ({ ...prev, severity: value }))
                }
            />

            <EnumSelect
                label="Status"
                value={formData.status}
                options={statusOptions}
                onChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                }
            />

            <TextField
                label="Reported By"
                name="reportedBy"
                value={formData.reportedBy}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={3}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Temporary Solution"
                name="tempSolution"
                value={formData.tempSolution}
                onChange={handleInputChange}
                multiline
                rows={2}
                fullWidth
                margin="normal"
            />

            <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mb: 2 }}
            >
                <UploadFileIcon sx={{ mr: 1 }} />
                {formData.file ? formData.file.name : "Upload Photo"}
                <input type="file" hidden onChange={handleFileChange} />
            </Button>

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

export default DiscrepancyForm;
