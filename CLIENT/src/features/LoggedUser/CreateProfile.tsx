import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, styled } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../test_redux/configureStore';
import { Redirect } from 'react-router';
import { FetchAllCities, fetchDistrict, locationCitySelectors, locationSelectors } from '../Locations/locationSlice';
import { City } from '../../app/models/Location';

export default function CreateProfile() {


    const districts = useAppSelector(locationSelectors.selectAll);
    const cities = useAppSelector(locationCitySelectors.selectAll);
    const dispatch = useAppDispatch();
    const { LocationLoaded } = useAppSelector(state => state.District);
    const { CityLoaded } = useAppSelector(state => state.City);
    const [getCities, setCities] = useState<City[]>([]);
    const [SelectedCity, setSelectedCity] = useState('');
    const [SelectedDistrict, setSelectedDistrict] = useState('');


    useEffect(() => {
        if (!LocationLoaded) dispatch(fetchDistrict());
        if (!CityLoaded) dispatch(FetchAllCities());
    }, [LocationLoaded, CityLoaded, dispatch])



    const handleClick_District = (districtId: number, districtName: string) => {
        setCities(cities.filter(ListCity => ListCity.districtId === districtId));
        setSelectedDistrict(districtName);
    };

    const handleClick_City = (cityName: string) => {
        setSelectedCity(cityName);
    }




    const Input = styled('input')({
        display: 'none',
    });



    const { LoadExist } = useAppSelector(state => state.ProfieExit);

    if (!LoadExist) return <Redirect to="/" />










    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" gutterBottom>
                        Create Profile
                    </Typography>
                    <Grid item={true} container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="address1"
                                name="address1"
                                label="Address"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                            />
                        </Grid>
                        <Grid>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                {/* <DatePicker
                                    views={['day']}
                                    label="Just date"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} helperText={null} />}
                                /> */}
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="Nic"
                                name="Nic"
                                label="Nic"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="About"
                                name="About"
                                label="About"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="Email"
                                name="Email"
                                label="Email"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="Phone"
                                name="Phone"
                                label="Phone"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="Status"
                                name="Status"
                                label="Status"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="Education"
                                name="Education"
                                label="Education"
                                fullWidth
                                autoComplete="shipping address-level2"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="Skills"
                                name="Skills"
                                label="Skills"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="WorkSummery"
                                name="WorkSummery"
                                label="WorkSummery"
                                fullWidth
                                autoComplete="shipping postal-code"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="SalaryHourly"
                                name="SalaryHourly"
                                label="SalaryHourly"
                                fullWidth
                                autoComplete="shipping country"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="WorkAs"
                                name="WorkAs"
                                label="WorkAs"
                                fullWidth
                                autoComplete="shipping country"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">District*</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={SelectedDistrict}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {districts.map(district => (
                                        <MenuItem onClick={() => handleClick_District(district.id, district.districtName)} value={district.districtName}>{district.districtName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">City*</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={SelectedCity}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {getCities.map(city => (
                                        <MenuItem onClick={() => handleClick_City(city.citytName)} value={city.citytName}>{city.citytName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        


                        <Grid item xs={12} sm={6}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">District*</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={SelectedDistrict}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {districts.map(district => (
                                        <MenuItem onClick={() => handleClick_District(district.id, district.districtName)} value={district.districtName}>{district.districtName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">City*</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={SelectedCity}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {getCities.map(city => (
                                        <MenuItem onClick={() => handleClick_City(city.citytName)} value={city.citytName}>{city.citytName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12}>
                            <Button variant="contained">Cancel</Button>
                            <Button variant="contained">Submit</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
}