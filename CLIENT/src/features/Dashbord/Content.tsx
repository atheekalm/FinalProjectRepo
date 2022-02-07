import {
    Box, FormControl, FormControlLabel, Grid, List,
    ListItemButton, ListItemIcon, ListItemText, ListSubheader, Pagination, Paper, Radio,
    RadioGroup,
    useMediaQuery,
    useTheme,
    Checkbox
} from "@mui/material";
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import StarRateIcon from '@mui/icons-material/StarRate';
import Services from "../Services/Services";
import LocationsDetails from "../Locations/LocationsDetails";
import CategoryDetails from "../Category/CategoryDetails";
import SearchService from "./SearchService";





export default function Content() {
    const theme = useTheme();
    const screenMathces = useMediaQuery(theme.breakpoints.up('sm'));
    const sidebar = (
        <>
            <Grid item style={{ height: '100vh', width: '15rem', margin: '1rem' }}>
                <Paper sx={{ mb: 2 }}>
                    <SearchService />
                </Paper>
                <Paper sx={{ mb: 2 }}>
                    <List
                        sx={{ width: '100%', maxWidth: 380, bgcolor: 'background.paper' }}
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
                            <ListItemText primary="Top Services" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <PhoneInTalkIcon />
                            </ListItemIcon>
                            <ListItemText primary="Over Call" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <MapsHomeWorkIcon />
                            </ListItemIcon>
                            <ListItemText primary="In Place" />
                        </ListItemButton>
                    </List>
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="gender"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Checkbox  />} label="Female" />
                            <FormControlLabel value="male" control={<Checkbox />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                </Paper>

            </Grid>
        </>
    )
    return (
        <>
            <Grid container item>
                {screenMathces ? sidebar : null}
                <Grid item xs md xl >
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