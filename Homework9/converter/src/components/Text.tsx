import Typography, { TypographyProps } from '@mui/material/Typography';

type Props = {
    label: string | number;
    variant: TypographyProps['variant'];
    color: string;
}

export const Text = ({label,variant,color}:Props) => {
    return <Typography sx={{color: color}} variant={variant}>{label}</Typography>
};