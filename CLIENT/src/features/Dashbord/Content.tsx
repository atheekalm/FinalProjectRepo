import {
    Box, FormControl, FormControlLabel, FormLabel, Grid, List,
    ListItemButton, ListItemIcon, ListItemText, ListSubheader, Pagination, Paper, Radio,
    RadioGroup
} from "@mui/material";
import StarRateIcon from '@mui/icons-material/StarRate';
import Services from "../Services/Services";
import LocationsDetails from "../Services/LocationsDetails";
import CategoryDetails from "../Services/CategoryDetails";
import SearchService from "./SearchService";

export default function Content() {
    
    return (
        <>
            <Grid container spacing={0} style={{ marginTop: '1.5rem' }}>
                <Grid item xs={2.4} style={{ height: '100vh', margin: '0.9rem' }}>
                    <Paper sx={{ mb: 2 }}>
                        <SearchService />
                    </Paper>
                    <Paper sx={{ mb: 2 }}>
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    filter services by
                                </ListSubheader>
                            }
                        >
                            <LocationsDetails />
                            <CategoryDetails />
                            <ListItemButton>
                                <ListItemIcon>
                                    <StarRateIcon />
                                </ListItemIcon>
                                <ListItemText primary="Top Rating" />
                            </ListItemButton>
                        </List>
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </Paper>

                </Grid>
                <Grid item xs >
                    <Services />
                </Grid>
            </Grid>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
            }}>
                <Pagination count={13} size="large" />
            </Box>

        </>
    )
}