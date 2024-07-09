import {Text} from "./Text";
import {Input} from "./Input";
import {Select} from "./Select";
import {useEffect, useState} from "react";
import {Button, Box} from '@mui/material';
import {useFetch} from "../utils/useFetch";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export const Converter = () => {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [url, setUrl] = useState('');

    const [label1, setLabel1] = useState('');
    const [label2, setLabel2] = useState('');
    const [label3, setLabel3] = useState('');
    const [label4, setLabel4] = useState('');

    useEffect(() => {
        if (from) {
            setUrl(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.min.json`);
        }
    }, [from]);

    const { data, error } = useFetch(url);

    const handleAmountChange = (e: any) => {
        setAmount(e.target.value);
    };

    const handleFromChange = (e: any) => {
        setFrom(e.target.value);
    };

    const handleToChange = (e: any) => {
        setTo(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(data);
        if (data) {
            const result = data[from][to] * amount;
            setLabel1(`${amount} ${from} = `);
            setLabel2(`${result} ${to}`);
            setLabel3(`1 ${from} = ${data[from][to]} ${to}`);
            setLabel4(`1 ${to} = ${1/data[from][to]} ${from}`);
        }
    }

    const onClickSwapButton = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    }

    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: '20px',
                backgroundColor: 'aliceblue',
                minHeight: '100vh'
            }}>
            <Text label='I want to convert' variant='h3' color='black'/>
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        gap: '20px',
                    }}>
                    <Input value={amount} label='Amount' onChange={handleAmountChange}/>
                    <Select disabled={false} value={from} label='From' onChange={handleFromChange}/>
                    <Button disabled={from === '' || to === ''} variant='contained' onClick={onClickSwapButton}><SwapHorizIcon/></Button>
                    <Select disabled={from === ''} value={to} label='To' onChange={handleToChange}/>
                    <Button disabled={from === '' || to === ''} type='submit' variant='contained'>Convert</Button>
                </Box>
            </form>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Box sx={{display:'flex', marginBottom: '30px'}}>
                    <Text label={label1} variant='h3' color='black'/>
                    <Text label={label2} variant='h3' color='lightgreen'/>
                </Box>
                <Text label={label3} variant='h5' color='black'/>
                <Text label={label4} variant='h5' color='black'/>
            </Box>
        </Box>
    )
}