import { LocalizationProvider, DatePicker, LoadingButton } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Container, Paper, Typography, Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react"
import { useForm, FieldValues } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { subcategory } from "../../app/models/Category";
import { City } from "../../app/models/Location";
import { categoriesSelector, subcategoriesSelector } from "../Category/CategorySlice";
import { locationSelectors, locationCitySelectors, fetchDistrict, FetchAllCities } from "../Locations/locationSlice";
import { useAppDispatch, useAppSelector } from "../test_redux/configureStore"

export default function EditProfile() {


    const districts = useAppSelector(locationSelectors.selectAll);
    const cities = useAppSelector(locationCitySelectors.selectAll);
    const categories = useAppSelector(categoriesSelector.selectAll);
    const subcategories = useAppSelector(subcategoriesSelector.selectAll);
    const dispatch = useAppDispatch();
    const { LocationLoaded } = useAppSelector(state => state.District);
    const { CityLoaded } = useAppSelector(state => state.City);
    const [getCities, setCities] = useState<City[]>([]);
    const [getSubCategory, setSubCategory] = useState<subcategory[]>([]);
    const [SelectedCity, setSelectedCity] = useState('');
    const [SelectedDistrict, setSelectedDistrict] = useState('');
    const [SelectedCategory, setSelectedCategory] = useState('');
    const [SelectedSubCategory, setSelectedSubCategory] = useState('');
    const [gender, setGender] = useState('');


    useEffect(() => {
        if (!LocationLoaded) dispatch(fetchDistrict());
        if (!CityLoaded) dispatch(FetchAllCities());
    }, [LocationLoaded, CityLoaded, dispatch])

    const [value, setValue] = useState<Date | null>(null);

    const handleClick_District = (districtId: number, districtName: string) => {
        setCities(cities.filter(ListCity => ListCity.districtId === districtId));
        setSelectedDistrict(districtName);
    };

    const handleClick_Category = (CategoryId: number, CategoryName: string) => {
        setSubCategory(subcategories.filter(subcateg => subcateg.categoryId === CategoryId));
        setSelectedCategory(CategoryName);
    };



    const handleClick_City = (cityName: string) => {
        setSelectedCity(cityName);
    }
    const handleClick_SubCategory = (SubCategory: string) => {
        setSelectedSubCategory(SubCategory);
    }

    const history = useHistory();
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    });

    async function submitForm(data: FieldValues) {
        //   await dispatch();
        history.push('/EditProfile');
    }


    const { LoadExist } = useAppSelector(state => state.ProfieExit);

    if (!LoadExist) return <Redirect to="/" />

    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" gutterBottom>
                        Create Profile
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                        <Grid item={true} container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="First name"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    autoFocus
                                    {...register('firstName', { required: 'firstName is Required' })}
                                    error={!!errors.firstName}
                                    helperText={errors?.firstName?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Last name"
                                    fullWidth
                                    autoComplete="family-name"
                                    variant="standard"
                                    autoFocus
                                    {...register('lastName', { required: 'lastName is Required' })}
                                    error={!!errors.lastName}
                                    helperText={errors?.lastName?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Address"
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                    variant="standard"
                                    autoFocus
                                    {...register('Address', { required: 'Address is Required' })}
                                    error={!!errors.Address}
                                    helperText={errors?.Address?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="Nic"
                                    label="Nic"
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                    variant="standard"
                                    autoFocus
                                    {...register('Nic', { required: 'Nic is Required' })}
                                    error={!!errors.Nic}
                                    helperText={errors?.Nic?.message}
                                />
                            </Grid>
                            <Grid xs={6} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['day']}
                                        label="Just date"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} helperText={null} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="about"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    defaultValue="Default Value"
                                    variant="filled"
                                    autoFocus
                                    {...register('about', { required: 'about is Required' })}
                                    error={!!errors.about}
                                    helperText={errors?.about?.message}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                    variant="standard"
                                    autoFocus
                                    {...register('Email', { required: 'Email is Required' })}
                                    error={!!errors.Email}
                                    helperText={errors?.Email?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Phone"
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                    variant="standard"
                                    autoFocus
                                    {...register('Phone', { required: 'Phone is Required' })}
                                    error={!!errors.Phone}
                                    helperText={errors?.Phone?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="status"
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                    variant="standard"
                                    autoFocus
                                    {...register('status', { required: 'status is Required' })}
                                    error={!!errors.status}
                                    helperText={errors?.status?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">Gender*</InputLabel>
                                    <Select
                                        value={gender}
                                        autoFocus
                                        {...register('gender', { required: 'gender is Required' })}
                                        error={!!errors.gender}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value="Male" onClick={() => setGender('Male')}>Male</MenuItem>
                                        <MenuItem value="Female" onClick={() => setGender('Female')} >Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Skills"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    {...register('skills', { required: 'skills is Required' })}
                                    error={!!errors.skills}
                                    helperText={errors?.skills?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="WorkSummery"
                                    fullWidth
                                    autoComplete="shipping postal-code"
                                    variant="standard"
                                    autoFocus
                                    {...register('workSummery', { required: 'workSummery is Required' })}
                                    error={!!errors.workSummery}
                                    helperText={errors?.workSummery?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="SalaryHourly"
                                    fullWidth
                                    autoComplete="shipping country"
                                    variant="standard"
                                    autoFocus
                                    {...register('salaryHourly', { required: 'salaryHourly is Required' })}
                                    error={!!errors.salaryHourly}
                                    helperText={errors?.salaryHourly?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="WorkAs"
                                    fullWidth
                                    autoComplete="shipping country"
                                    variant="standard"
                                    autoFocus
                                    {...register('workAs', { required: 'workAs is Required' })}
                                    error={!!errors.workAs}
                                    helperText={errors?.workAs?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">District*</InputLabel>
                                    <Select
                                        value={SelectedDistrict}
                                        autoFocus
                                        {...register('district', { required: 'district is Required' })}
                                        error={!!errors.district}
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
                                        value={SelectedCity}
                                        autoFocus
                                        {...register('city', { required: 'city is Required' })}
                                        error={!!errors.city}
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
                                    <InputLabel id="demo-simple-select-standard-label">Category*</InputLabel>
                                    <Select
                                        value={SelectedCategory}
                                        autoFocus
                                        {...register('category', { required: 'category is Required' })}
                                        error={!!errors.category}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {categories.map(categor => (
                                            <MenuItem onClick={() => handleClick_Category(categor.id, categor.categoryName)} value={categor.categoryName}>{categor.categoryName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label">SubCategory*</InputLabel>
                                    <Select
                                        value={SelectedSubCategory}
                                        autoFocus
                                        {...register('subCategory', { required: 'subCategory is Required' })}
                                        error={!!errors.subCategory}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {getSubCategory.map(getSub => (
                                            <MenuItem onClick={() => handleClick_SubCategory(getSub.subCategoryName)} value={getSub.subCategoryName}>{getSub.subCategoryName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <LoadingButton
                            disabled={!isValid}
                            loading={isSubmitting}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create Profile
                        </LoadingButton>
                    </Box>
                </Paper>
            </Container>
        </>

    );
}