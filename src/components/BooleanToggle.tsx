import React from "react";
import { FormControlLabel, Switch } from "@mui/material";

interface BooleanToggleProps {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const BooleanToggle: React.FC<BooleanToggleProps> = ({ label, value, onChange }) => {
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    color="primary"
                />
            }
            label={label}
        />
    );
};

export default BooleanToggle;
