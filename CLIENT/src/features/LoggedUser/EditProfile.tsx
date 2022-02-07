import { LocalizationProvider, DatePicker, LoadingButton } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Container, Paper, Typography, Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
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
            <Container component="main" >
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid xs={12} md={5} sx={{ margin: 1 }}>
                        <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" sx={{ margin: 1 }} />
                        <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" sx={{ margin: 1 }} />                <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" sx={{ margin: 1 }} />
                        <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" sx={{ margin: 1 }} />
                        <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" sx={{ margin: 1 }} />
                        <TextField fullWidth id="outlined-basic" label="Outlined" variant="outlined" sx={{ margin: 1 }} />
                    </Grid>
                    <Grid xs={12} md={6} >
                        <FormControl sx={{ margin: 1 }}>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
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
                                            autoFocus
                                            {...register('district', { required: 'district is Required' })}
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
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl sx={{ margin: 1 }} variant="outlined" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">City*</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            value={SelectedCity}
                                            autoFocus
                                            {...register('city', { required: 'city is Required' })}
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
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl sx={{ margin: 1 }} variant="outlined" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">Category*</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={SelectedCategory}
                                            autoFocus
                                            {...register('category', { required: 'category is Required' })}
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
                                <Grid item md={6} xs={12} sm={12}>
                                    <FormControl sx={{ margin: 1 }} variant="outlined" fullWidth>
                                        <InputLabel id="demo-simple-select-standard-label">SubCategory*</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={SelectedSubCategory}
                                            autoFocus
                                            {...register('subCategory', { required: 'subCategory is Required' })}
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
                            <TextField
                                multiline
                                rows={3}
                                fullWidth
                                id="outlined-basic"
                                label="Outlined"
                                variant="outlined"
                                sx={{ margin: 1 }}
                                defaultValue="Default Value"
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