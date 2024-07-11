import {Box} from "@mui/material";
import {Text} from "../components/Text";

export const ErrorPage = () => {
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
            <Text label={"Something get wrong..."} variant={'h3'} color={'black'}/>
        </Box>
    );
}