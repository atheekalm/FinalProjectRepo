import { Box, Container, Grid, List, ListItem, Divider, TextField, Fab, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";



export default function MessageOneDir() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();
    const [messages, setMessages] = useState([]);
    function passMessage(message: FieldValues) {
        // setMessages(message);
    }

    return (
        <>
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Container>
                    <Grid item >
                        <List >
                            <ListItem key="1">
                                <Grid container>
                                    <Grid item >
                                        {
                                            messages.map(message =>
                                                <Typography variant="body2" gutterBottom>
                                                    {/* {message.content} */}
                                                </Typography>
                                            )
                                        }
                                    </Grid>
                                </Grid>
                            </ListItem>
                        </List>
                        <Divider />
                        <Grid component="form" onSubmit={handleSubmit(passMessage)} container style={{ padding: '20px' }}>
                            <Grid item xs={11}>
                                <TextField
                                    label="Type Something"
                                    fullWidth
                                    {...register}
                                />
                            </Grid>
                            <Grid xs={1} >
                                <Fab onClick={() => passMessage} color="primary" aria-label="add"><SendIcon /></Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}