import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {Input} from "@mui/material";

const FoodWasteReportForm: React.FC = () => {
    return (
        <Box
            sx={{
                maxWidth: 500,
                mx: 'auto',
                mt: 4,
                p: 3,
                borderRadius: 2,
                boxShadow: 7,
                bgcolor: 'background.paper',


            }}

        >
            <Typography
                variant="h5"
                sx={{
                    mb: 3,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'primary.main',
                }}
            >
                Food Waste Report
            </Typography>

            {/* Food Item Input */}
            <TextField
                label="Food Item"
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{ mb: 2 }}
            />

            <Input



                sx={{ mb: 2 }}
                type={"file"}/>

            {/* Quantity Input */}
            <TextField
                label="Quantity"
                type="number"
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{ mb: 2 }}
            />


            {/* Unit Dropdown */}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="unit-label">Unit</InputLabel>
                <Select
                    labelId="unit-label"
                    id="unit-select"
                    label="Unit"
                >
                    <MenuItem value="kg">Kilograms (kg)</MenuItem>
                    <MenuItem value="g">Grams (g)</MenuItem>
                    <MenuItem value="lbs">Pounds (lbs)</MenuItem>
                    <MenuItem value="oz">Ounces (oz)</MenuItem>
                </Select>
            </FormControl>

            {/* Description Input */}
            <TextareaAutosize
                minRows={4}
                placeholder="Description (optional)"
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    borderColor: '#c4c4c4',
                    borderWidth: '1px',
                    background: 'inherit',
                    color: 'inherit',
                    resize: 'none',
                    fontSize: '1rem',
                }}
            />

            {/* Submit Button */}
            <Button
                variant="contained"
                fullWidth
                sx={{
                    mt: 3,
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 'bold',
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    },
                }}
            >
                Submit Report
            </Button>
        </Box>
    );
};

export default FoodWasteReportForm;
