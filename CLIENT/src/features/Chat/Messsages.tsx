import { Box, Avatar, Container, Divider, Fab, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useAppSelector } from "../test_redux/configureStore";
import { messageThread } from "./MessagesThread";
// import { useState } from "react";
// import { MessageThreadInterface } from "../../app/models/Message";


export default function Messages() {
    const { Messages } = useAppSelector(state => state.Messages);
    const { MessagesThread } = useAppSelector(state => state.MessageThread);
    const dispatch = useAppDispatch();
    // const [usermessage, setUsermessage] = useState<MessageThreadInterface[]>([]);

    const fetchmessages = (username: string) => {
        dispatch(messageThread(username));
    }

    return (
        <>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Container>
                    <Grid container component={Paper} sx={{ mt: 5 }}>
                        <Grid item xs={3} >
                            <List>
                                {Messages?.map(message =>
                                    <ListItem button key={message.id} divider onClick={() => fetchmessages(message.senderUsername)}>
                                        <ListItemIcon>
                                            <Avatar src={message.recipientPhotoUrl} />
                                        </ListItemIcon>
                                        <ListItemText >{message.senderUsername}</ListItemText>
                                    </ListItem>
                                )}
                            </List>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={8}>
                            <List >
                                <ListItem key="1">
                                    <Grid container>
                                        <Grid item xs={12}>
                                            {MessagesThread?.map(message =>
                                                <ListItemText key={message.id} primary={message.content}></ListItemText>
                                            )}
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </List>
                            <Divider />
                            <Grid container style={{ padding: '20px' }}>
                                <Grid item xs={11}>
                                    <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                                </Grid>
                                <Grid xs={1} >
                                    <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}