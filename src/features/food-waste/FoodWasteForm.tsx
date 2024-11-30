import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import UploadFileIcon from "@mui/icons-material/UploadFile";


const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export interface FoodItem {
    id: string;
    name: string;
    unit: string;
}

const FoodWasteReportForm: React.FC = () => {
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // For search input
    const [page, setPage] = useState(1); // For pagination
    const [hasMore, setHasMore] = useState(true); // To track if more items are available
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [quantDesc, setQuantDesc] = useState<string>("");
    const formed = new FormData();
    const [formData, setFormData] = useState({
        FoodItemId: "",
        Quantity: 0,
        Description: "",
        Department: "",
    });

    useEffect(() => {
        const fetchFoodItems = async () => {
            if (!hasMore) return;
            setLoading(true);
            try {
                const response = await fetch(
                    `${BASE_URL}/api/food-items?search=${searchTerm}&page=${page}&limit=10`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch food items.");
                }
                const data: { items: FoodItem[]; hasMore: boolean } = await response.json();
                setFoodItems((prev) => [...prev, ...data.items]); // Append new data
                setHasMore(data.hasMore);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodItems();
    }, [searchTerm, page]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "Quantity" ? parseFloat(value) : value, // Ensure Quantity is parsed to a number
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>, field: string) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value as string }));
    };

    const handleFoodItemChange = (event: any, newValue: FoodItem | null) => {
        setFormData((prev) => ({ ...prev, FoodItemId: newValue?.id || "" }));
        setQuantDesc(newValue.unit)
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleScroll = (event: React.SyntheticEvent) => {
        const listboxNode = event.currentTarget;
        if (
            listboxNode.scrollTop + listboxNode.clientHeight >=
            listboxNode.scrollHeight
        ) {
            setPage((prev) => prev + 1); // Load next page when scrolling reaches bottom
        }
    };

    const handleSubmit =  async () => {
        const payload = {
            ...formData,
            file: selectedFile, // File included in the payload
        };

        formed.append("ReportJson", JSON.stringify(formData))
        formed.append("File", selectedFile);
        console.log("Submitting payload:", payload);
        try {
            await fetch(`${BASE_URL}/api/food-waste-reports`, {
                method: "POST",

                body: formed,
            });
        } catch (error) {
            console.log(error);
        }
    }
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
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    mb: 3,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#FFFFFF", // White text for the title
                }}
            >
                Food Waste Report
            </Typography>

            {/* Searchable Dropdown for FoodItemId */}
            <Autocomplete
                options={foodItems}
                getOptionLabel={(option) => option.name}
                loading={loading}
                onInputChange={(event, value) => {
                    setSearchTerm(value);
                    setPage(1); // Reset to the first page for new search
                    setFoodItems([]); // Clear previous items
                    setHasMore(true); // Reset hasMore for the new search
                }}
                onChange={handleFoodItemChange} // Update selected value
                ListboxProps={{ onScroll: handleScroll }} // Handle scroll for pagination
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Food Item"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                color: "#E0F7FA",
                            },
                            "& .MuiInputLabel-root": {
                                color: "#B0BEC5",
                            },
                        }}
                    />
                )}
                sx={{ mb: 2 }}
            />

            {/* Quantity Input */}
            <TextField
                label={`Quantity ${quantDesc}`}
                type="number"
                name="Quantity"
                value={formData.Quantity}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{
                    mb: 2,
                    "& input[type=number]": {
                        MozAppearance: "textfield",
                    },
                    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                        WebkitAppearance: "none",
                        margin: 0,
                    },
                    "& .MuiOutlinedInput-root": {
                        color: "#E0F7FA", // Light cyan text
                    },
                    "& .MuiInputLabel-root": {
                        color: "#B0BEC5", // Light gray label
                    },
                }}
            />

            {/* Department Dropdown */}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="department-label" sx={{ color: "#B0BEC5" }}>
                    Department
                </InputLabel>
                <Select
                    labelId="department-label"
                    value={formData.Department}
                    onChange={(e) => handleSelectChange(e, "Department")}
                    sx={{
                        color: "#E0F7FA", // Light cyan text
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#FF6F61", // Coral border for dropdown
                        },
                    }}
                >
                    <MenuItem value="Kitchen">Kitchen</MenuItem>
                    <MenuItem value="Storage">Storage</MenuItem>
                    <MenuItem value="Service">Service</MenuItem>
                </Select>
            </FormControl>

            {/* Description Input */}
            <TextField
                label="Description"
                name="Description"
                value={formData.Description}
                onChange={handleInputChange}
                multiline
                rows={4}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{
                    "& .MuiOutlinedInput-root": {
                        color: "#E0F7FA", // Light cyan text
                    },
                    "& .MuiInputLabel-root": {
                        color: "#B0BEC5", // Light gray label
                    },
                }}
            />

            {/* File Upload */}
            <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    textTransform: "none",
                    color: "#FF6F61", // Coral text
                    borderColor: "#FF6F61", // Coral border
                    "&:hover": {
                        bgcolor: "#FF867C", // Light coral background
                        color: "#FFFFFF", // White text
                    },
                }}
            >
                <UploadFileIcon sx={{ mr: 1 }} />
                {selectedFile ? selectedFile.name : "Upload Photo"}
                <input type="file" hidden onChange={handleFileChange} />
            </Button>

            {/* Submit Button */}
            <Button
                variant="contained"
                fullWidth
                sx={{
                    mt: 3,
                    bgcolor: "#FF6F61", // Coral background
                    color: "white",
                    fontWeight: "bold",
                    "&:hover": {
                        bgcolor: "#FF867C", // Light coral hover
                    },
                }}
                onClick={handleSubmit}
            >
                Submit Report
            </Button>
        </Box>
    );
};

export default FoodWasteReportForm;