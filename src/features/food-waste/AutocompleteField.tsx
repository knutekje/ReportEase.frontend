import React from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

interface AutocompleteFieldProps {
    label: string;
    options: { id: string; name: string }[]; // Options for the dropdown
    loading: boolean; // Loading state
    value: { id: string; name: string } | null; // Current selected value
    onChange: (event: any, value: { id: string; name: string } | null) => void; // Callback when value changes
    disabled?: boolean; // Optional: disable the autocomplete field
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
                                                                 label,
                                                                 options,
                                                                 loading,
                                                                 value,
                                                                 onChange,
                                                                 disabled = false,
                                                             }) => {
    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) => option.name}
            loading={loading}
            value={value}
            onChange={onChange}
            disabled={disabled}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
};

export default AutocompleteField;
