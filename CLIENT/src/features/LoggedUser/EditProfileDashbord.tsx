import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EditProfile from './EditProfile';
import PhotosUpload from './PhotosUpload';
import { Container } from '@mui/material';

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
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function EditProfileDashbord() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container
        sx={{mt:5}}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    height: 284,
                }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider', width: '220px' }}
                >
                    <Tab label="Edit Profile" {...a11yProps(0)} />
                    <Tab label="Upload Photos" {...a11yProps(1)} />
                    <Tab label="Saved Profile" {...a11yProps(2)} />
                    <Tab label="Item Four" {...a11yProps(3)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <EditProfile />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <PhotosUpload />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Profiles
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Item Four
                </TabPanel>
            </Box>
        </Container>
    );
}








