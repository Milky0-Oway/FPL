import {useHistory} from "../context/ContextProvider";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useNavigate} from "react-router-dom";

type Props = {
    length: number;
}

export const History = ({length}: Props) => {

    const {history, dispatch} = useHistory();

    const navigate = useNavigate();

    const handleRowClick = (currencyId: string) => {
        navigate(`/currency-info/${currencyId}`);
    };

    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">From</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="center">To</TableCell>
                        <TableCell align="center">Result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.slice(0, length).map((operation, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{operation.date}</TableCell>
                            <TableCell align="center" key={operation.from} onClick={() => handleRowClick(operation.from)}>{operation.from}</TableCell>
                            <TableCell align="center">{operation.amount}</TableCell>
                            <TableCell align="center" key={operation.to} onClick={() => handleRowClick(operation.to)}>{operation.to}</TableCell>
                            <TableCell align="center">{operation.result}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};