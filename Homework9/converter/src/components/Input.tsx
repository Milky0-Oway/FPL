import {TextField} from '@mui/material';

type Props = {
    value: number;
    label: string;
    onChange: (e:any) => void;
}

export const Input = ({value, label, onChange}: Props) => {
    return <TextField type='number' value={value} onChange={onChange} id='standart-basic' label={label} variant='standard' />;
};