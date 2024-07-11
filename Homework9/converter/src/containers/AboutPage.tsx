import {Box} from "@mui/material";
import {Text} from "../components/Text";

export const AboutPage = () => {
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
            <Text label={"Welcome to the converter app!"} variant={'h3'} color={'black'}/>
            <Text label={"I hope you'll enjoy it"} variant={'h3'} color={'lightgreen'}/>
            <Text label={"Made by Milena Korotkaya"} variant={'h6'} color={'black'}/>
        </Box>
    );
}