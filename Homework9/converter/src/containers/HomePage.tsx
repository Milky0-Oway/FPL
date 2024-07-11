import {Box} from "@mui/material";
import {Converter} from "../components/Converter";
import {History} from "../components/History";
import {Text} from "../components/Text";

export const HomePage = () => {
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
            <Converter/>
            <Text label={"Exchange History"} variant={'h3'} color={'black'}/>
            <History length={10}/>
        </Box>
    );
}