import React, { useState } from "react";
import { Card, CardContent, Dialog, DialogContent, TextField, Box, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Check, Edit } from "@mui/icons-material";
import { DeleteButton } from "./DeleteButton.tsx";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export interface Report {
    foodItemId: string;
    itemName: string;
    quantity: number;
    description: string;
    submittedBy: string;
    reportDate: string;
    value: number;
    photoId: string;
    foodwasteid: string;
}

export const FoodWasteItem = ({ report }: { report: Report }) => {
    const [editing, setEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<Report>(report);
    const [open, setOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "quantity" ? parseInt(value, 10) : value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setFormData((prev) => ({
            ...prev,
            foodItemId: e.target.value as string,
        }));
    };

    const handleSave = () => {
        console.log("Updated Report Data:", formData);
        setEditing(false);
        // Add API call to update the report
    };

    return (
        <Box key={report.foodwasteid} sx={{ padding: "8px" }}>
            <Card
                sx={{
                    border: "2px solid #FF6F61", // Coral border
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#1E1E2F", // Dark slate blue background
                    padding: 1,
                    width: "40vw",
                    alignItems: "flex-start",
                }}
            >
                {/* Image Section */}
                <Box
                    sx={{
                        padding: "8px",
                        flexShrink: 0,
                        width: "320px",
                        height: "420px",
                    }}
                >
                    <img
                        width="100%"
                        height="100%"
                        src={`${BASE_URL}/api/photos/download/${report.photoId}`}
                        alt={`${report.itemName || "Food Item"} Image`}
                        style={{
                            objectFit: "cover",
                            cursor: "pointer",
                            borderRadius: "4px",
                        }}
                        onClick={() => setOpen(true)}
                    />

                    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
                        <DialogContent
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#1E1E2F",
                                padding: 2,
                            }}
                        >
                            <img
                                src={`${BASE_URL}/api/photos/download/${report.photoId}`}
                                alt={`${report.itemName || "Food Item"} Image`}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "80vh",
                                    objectFit: "contain",
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flexGrow: 1,
                        padding: 1,
                        gap: 1,
                    }}
                >
                    <CardContent
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            padding: 0,
                            color: "#E0F7FA", // Light cyan text
                        }}
                    >
                        {/* Food Item Dropdown */}
                        <FormControl fullWidth disabled={!editing}>
                            <InputLabel id="food-item-label" sx={{ color: editing ? "#B0BEC5" : "#E0F7FA" }}>
                                Food Item
                            </InputLabel>
                            <Select
                                labelId="food-item-label"
                                value={formData.foodItemId}
                                onChange={handleSelectChange}
                                sx={{
                                    color: "#E0F7FA",
                                    borderColor: editing ? "#FF6F61" : undefined,
                                }}
                            >
                                <MenuItem value="apple">Apple</MenuItem>
                                <MenuItem value="banana">Banana</MenuItem>
                                <MenuItem value="carrot">Carrot</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Quantity Input */}
                        <TextField
                            label="Quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            variant="outlined"
                            disabled={!editing}
                            fullWidth
                            sx={{
                                mb: 1,
                                "& .MuiInputBase-input": { color: "#E0F7FA" },
                                "& .MuiInputLabel-root": { color: editing ? "#B0BEC5" : "#E0F7FA" },
                            }}
                        />

                        {/* Description Input */}
                        <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            variant="outlined"
                            disabled={!editing}
                            fullWidth
                            multiline
                            rows={2}
                            sx={{
                                mb: 1,
                                "& .MuiInputBase-input": { color: "#E0F7FA" },
                                "& .MuiInputLabel-root": { color: editing ? "#B0BEC5" : "#E0F7FA" },
                            }}
                        />
                    </CardContent>

                    {/* Buttons Section */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        {editing ? (
                            <>
                                <Button onClick={handleSave} variant="contained" color="success">
                                    Save
                                </Button>
                                <Button onClick={() => setEditing(false)} variant="outlined" color="error">
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={() => setEditing(true)}
                                    startIcon={<Edit />}
                                    variant="outlined"
                                    sx={{
                                        color: "#FF6F61",
                                        borderColor: "#FF6F61",
                                        "&:hover": { bgcolor: "#FF867C", color: "#FFFFFF" },
                                    }}
                                >
                                    Edit
                                </Button>
                                <DeleteButton id={report.foodwasteid} />
                            </>
                        )}
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};
