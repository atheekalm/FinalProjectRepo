import { Avatar, Box, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ImageIcon from '@mui/icons-material/Image';


export default function myAccount() {


useEffect(()=>{
    
})


    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Grid>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Container>
                                <Paper
                                    sx={{
                                        marginTop: 5,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}>
                                    <Avatar
                                        sx={{
                                            width: 200, height: 200,
                                            marginTop: 4
                                        }}
                                    />
                                    <List sx={{
                                        width: '100%',
                                        maxWidth: 360,
                                        bgcolor: 'background.paper',

                                    }}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ImageIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Container>
                        </Grid>
                        <Grid item xs={8}>
                            <Container>
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Item One" {...a11yProps(0)} />
                                            <Tab label="Item Two" {...a11yProps(1)} />
                                            <Tab label="Item Three" {...a11yProps(2)} />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value={value} index={0}>
                                        Item One
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        Item Two
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        Item Three
                                    </TabPanel>
                                </Box>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </>
    )
}