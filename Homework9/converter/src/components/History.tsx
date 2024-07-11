import {useHistory} from "../context/ContextProvider";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type Props = {
    length: number;
}

export const History = ({length}: Props) => {

    const {history, dispatch} = useHistory();

    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Operation</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.slice(0, length).map((operation, index) => (
                        <TableRow key={index}>
                            <TableCell align="center">{operation.date}</TableCell>
                            <TableCell align="center">{operation.operation}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};