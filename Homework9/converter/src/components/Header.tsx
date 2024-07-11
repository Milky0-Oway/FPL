import {Box} from "@mui/material";
import {Link} from "react-router-dom";

export const Header = () => {
    return(
        <Box sx={{
            fontSize: '25px',
            display: 'flex',
            gap: '30px',
            padding: '20px',
            justifyContent: 'center'
        }}>
            <Link to='/' style={{textDecoration:'none'}}>Currency converter</Link>
            <Link to='/history' style={{textDecoration:'none'}}>View conversion history</Link>
            <Link to='/about' style={{textDecoration:'none'}}>About us</Link>
        </Box>
    )
}