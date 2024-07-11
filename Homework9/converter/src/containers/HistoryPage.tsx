import {Box} from "@mui/material";
import {History} from "../components/History";
import {useHistory} from "../context/ContextProvider";
import {Text} from "../components/Text";

export const HistoryPage = () => {
    const {history, dispatch} = useHistory();

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
            <Text label={"Exchange History"} variant={'h3'} color={'black'}/>
            <History length={history.length}/>
        </Box>
    );
}