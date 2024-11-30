import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface EnumSelectProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

const EnumSelect: React.FC<EnumSelectProps> = ({ label, value, options, onChange }) => {
    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                label={label}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default EnumSelect;
