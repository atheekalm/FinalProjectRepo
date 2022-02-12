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
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import { useAppDispatch } from "../test_redux/configureStore";
import { resetParams } from "../Services/serviceSlice";




export default function Content() {
    const theme = useTheme();
    const screenMathces = useMediaQuery(theme.breakpoints.up('sm'));
    const dispatch = useAppDispatch();
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
                        <ListItemButton onClick={()=>dispatch(resetParams())}>
                            <ListItemIcon>
                                <FolderSharedIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Services" />
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
            <Grid container item sx={{backgroundColor:'#eaeaea'}}>
                {screenMathces ? sidebar : null}
                <Grid item xs md xl >
                    <Services />
                </Grid>
            </Grid>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                bgcolor: '#eaeaea',
                p:1
            }}>
                <Pagination count={13} size="large" />
            </Box>
        </>
    )
}