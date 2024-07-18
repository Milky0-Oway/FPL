import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux';
import { addNote } from '../redux/notesSlice';
import { Box, Button, TextField } from '@mui/material';
import {Text} from "../components/Text";

interface FormValues {
    title: string;
    body: string;
}

export const CurrencyInfoPage = () => {
    const { currencyId } = useParams<{ currencyId: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const note = useSelector((state: RootState) =>
        state.notes.notes.find(note => note.currencyId === currencyId)
    );

    const { register, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: note || { title: '', body: '' },
    });

    useEffect(() => {
        if (note) {
            setValue('title', note.title);
            setValue('body', note.body);
        }
    }, [note, setValue]);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        dispatch(addNote({
            currencyId: currencyId || '',
            title: data.title,
            body: data.body,
        }));
    };

    return (
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '20px',
            backgroundColor: 'aliceblue',
            minHeight: '100vh'
        }}>
            <Text label={'Currency Info'} variant={'h3'} color={'black'}/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Title"
                    {...register('title', { required: 'Title is required' })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Body"
                    {...register('body', { required: 'Body is required' })}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">Save Note</Button>
            </form>
        </Box>
    );
};