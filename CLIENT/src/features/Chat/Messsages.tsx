import { Box, Avatar, Container, Divider, Fab, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';


export default function Messages() {

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
                                <ListItem button key="RemySharp" divider>
                                    <ListItemIcon>
                                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                                    </ListItemIcon>
                                    <ListItemText primary="John Wick" ></ListItemText>
                                </ListItem>
                            </List>
                            <List>
                                <ListItem button key="RemySharp" divider>
                                    <ListItemIcon>
                                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                                    </ListItemIcon>
                                    <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                                    <ListItemText secondary="online" ></ListItemText>
                                </ListItem>
                                <ListItem button key="Alice" divider>
                                    <ListItemIcon>
                                        <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                                    </ListItemIcon>
                                    <ListItemText primary="Alice">Alice</ListItemText>
                                </ListItem>
                                <ListItem button key="CindyBaker" divider>
                                    <ListItemIcon>
                                        <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                                    </ListItemIcon>
                                    <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                                </ListItem>
                            </List>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={8}>
                            <List >
                                <ListItem key="1">
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ListItemText secondary="09:30"></ListItemText>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem key="2">
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <ListItemText primary="Hey, Iam Good! What about you ?"></ListItemText>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ListItemText secondary="09:31"></ListItemText>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem key="3">
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <ListItemText primary="Cool. i am good, let's catch up!"></ListItemText>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ListItemText secondary="10:30"></ListItemText>
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