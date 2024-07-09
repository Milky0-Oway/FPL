import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MUISelect, {SelectChangeEvent} from '@mui/material/Select';
import {currencies,loadCurrencies} from "../assets/currencies";
import {useEffect, useState} from "react";

type Props = {
    value: string;
    label: string;
    onChange: (e: SelectChangeEvent) => void;
    disabled: boolean;
}

export const Select = ({value, label, onChange, disabled}: Props) => {
    const [localCurrencies, setLocalCurrencies] = useState<{ [key: string]: string } | null>(currencies);

    useEffect(() => {
        if (!localCurrencies) {
            const loadAndSetCurrencies = async () => {
                await loadCurrencies();
                setLocalCurrencies(currencies);
            };

            loadAndSetCurrencies();
        }
    }, [localCurrencies]);

    if (!localCurrencies) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <MUISelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={onChange}
                disabled={disabled}
            >
                {Object.keys(localCurrencies).map(key => (
                    <MenuItem key={key} value={key}>{localCurrencies[key]}</MenuItem>
                ))}
            </MUISelect>
        </Box>
    )
}