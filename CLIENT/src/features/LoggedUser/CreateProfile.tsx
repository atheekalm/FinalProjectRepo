import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Container, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../test_redux/configureStore';
import { Redirect } from 'react-router';
import { FetchAllCities, fetchDistrict, locationCitySelectors, locationSelectors } from '../Locations/locationSlice';
import { City } from '../../app/models/Location';
import { useForm, FieldValues } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { categoriesSelector, subcategoriesSelector } from '../Category/CategorySlice';
import { subcategory } from '../../app/models/Category';
import { DatePicker, LoadingButton } from '@mui/lab';

export default function CreateProfile() {



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
        console.log(data);
        history.push('/EditProfile');
    }

    const { LoadExist } = useAppSelector(state => state.ProfieExit);

    if (!LoadExist) return <Redirect to="/" />

    return (
        <>
            <Container component="form" onSubmit={handleSubmit(submitForm)}>
                <Grid container spacing={2} sx={{ mt: 4 }} item>
                    <Grid item xs={12} md={5} sx={{ margin: 1 }}>
                        <TextField fullWidth id="outlined-basic" label="First Name" variant="outlined" sx={{ margin: 1 }}
                            {...register('firstName', { required: 'firstName is Required' })}
                            error={!!errors.firstName}
                            helperText={errors?.firstName?.message}
                        />
                        <TextField fullWidth id="outlined-basic" label="Last Name" variant="outlined" sx={{ margin: 1 }}
                            {...register('lasttName', { required: 'lasttName is Required' })}
                            error={!!errors.lasttName}
                            helperText={errors?.lasttName?.message}
                        />
                        <TextField fullWidth id="outlined-basic" label="Address" variant="outlined" sx={{ margin: 1 }}
                            {...register('address', { required: 'address is Required' })}
                            error={!!errors.address}
                            helperText={errors?.address?.message}
                        />
                        <TextField fullWidth id="outlined-basic" label="Nic" variant="outlined" sx={{ margin: 1 }}
                            {...register('nic', { required: 'nic is Required' })}
                            error={!!errors.nic}
                            helperText={errors?.nic?.message}
                        />
                        <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" sx={{ margin: 1 }}
                            {...register('email', { required: 'email is Required' })}
                            error={!!errors.email}
                            helperText={errors?.email?.message}
                        />
                        <TextField fullWidth id="outlined-basic" label="Phone Number" variant="outlined" sx={{ margin: 1 }}
                            {...register('phone', { required: 'phone is Required' })}
                            error={!!errors.phone}
                            helperText={errors?.phone?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <FormControl sx={{ margin: 1 }}>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                {...register('gender', { required: 'gender is Required' })}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                        <Grid item>
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                <DatePicker
                                    views={['day']}
                                    label="Just date"
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField fullWidth sx={{ margin: 1 }} {...params} helperText={null} />}
                                />
                            </LocalizationProvider>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl sx={{ margin: 1 }} variant="outlined" fullWidth >
                                        <InputLabel id="demo-simple-select-standard-label">District*</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            value={SelectedDistrict}
                                            {...register('district', { required: 'district is Required' })}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {districts.map(district => (
                                                <MenuItem key={district.id} onClick={() => handleClick_District(district.id, district.districtName)} value={district.districtName}>{district.districtName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl sx={{ margin: 1 }} variant="outlined" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">City*</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            value={SelectedCity}
                                            {...register('city', { required: 'city is Required' })}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {getCities.map(city => (
                                                <MenuItem key={city.id} onClick={() => handleClick_City(city.citytName)} value={city.citytName}>{city.citytName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl sx={{ margin: 1 }} variant="outlined" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Category*</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={SelectedCategory}
                                            {...register('category', { required: 'category is Required' })}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {categories.map(categor => (
                                                <MenuItem key={categor.id} onClick={() => handleClick_Category(categor.id, categor.categoryName)} value={categor.categoryName}>{categor.categoryName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl sx={{ margin: 1 }} variant="outlined" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label" >SubCategory*</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={SelectedSubCategory}
                                            {...register('subCategory', { required: 'subCategory is Required' })}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {getSubCategory.map(getSub => (
                                                <MenuItem key={getSub.id} onClick={() => handleClick_SubCategory(getSub.subCategoryName)} value={getSub.subCategoryName}>{getSub.subCategoryName}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <TextField
                                multiline
                                rows={3}
                                fullWidth
                                id="outlined-basic"
                                label="Outlined"
                                variant="outlined"
                                sx={{ margin: 1 }}
                                defaultValue="Default Value"
                                {...register('about', { required: 'about is Required' })}
                                error={!!errors.about}
                                helperText={errors?.about?.message}
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        disabled={!isValid}
                        loading={isSubmitting}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ margin: 1 }}
                    >
                        Create Profile
                    </LoadingButton>
                </Grid>
            </Container>
        </>
    );
}