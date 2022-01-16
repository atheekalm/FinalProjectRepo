import { District, City } from './../../app/models/Location';
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import client_agent from "../../app/api/client_agent";
import { RootState } from "../test_redux/configureStore";

const LocationAdapter_District = createEntityAdapter<District>();
const LocationAdapter_City= createEntityAdapter<City>();

export const fetchDistrict = createAsyncThunk<District[]>(
    'District/fetch',
    async (_, thunkAPI) => {
        try {
            return client_agent.Location.Distict();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)


export const FetchAllCities = createAsyncThunk<City[]>(
    'City/fetch',
    async (_, thunkAPI) => {
        try {
            return client_agent.Location.Cities();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)


export const fetchCity = createAsyncThunk<City[], number>(
    'City/fetch',
    async (districtId, thunkAPI) => {
        try {
            return client_agent.Location.City(districtId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const locationSlice = createSlice({
    name: 'Districts',
    initialState: LocationAdapter_District.getInitialState({
        LocationLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchDistrict.pending, (state) => {
            state.status = 'pendingFetchServices'
        });
        builder.addCase(fetchDistrict.fulfilled, (state, action) => {
            LocationAdapter_District.setAll(state, action.payload);
            state.status = 'idle';
            state.LocationLoaded = true
        });
        builder.addCase(fetchDistrict.rejected, (state) => {
            state.status = 'idle'
        });
    })
})

export const locationSlice_Cities = createSlice({
    name: 'Districts',
    initialState: LocationAdapter_City.getInitialState({
        CityLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchCity.pending, (state) => {
            state.status = 'pendingFetchCity'
        });
        builder.addCase(fetchCity.fulfilled, (state, action) => {
            LocationAdapter_City.setAll(state, action.payload);
            state.status = 'idle';
            state.CityLoaded = true
        });
        builder.addCase(fetchCity.rejected, (state) => {
            state.status = 'idle'
        });
    })
})


// interface cityState {
//     cities: City[] | null
// }
// const initialState: cityState = {
//     cities: null
// }

// export const locationSlice_City = createSlice({
//     name: 'City',
//     initialState,
//     reducers: {},
//     extraReducers: (builder => {
//         builder.addCase(fetchCity.pending, (state) => {
//             state.cities = null
//         });
//         builder.addCase(fetchCity.fulfilled, (state, action) => {
//             state.cities = action.payload
//         });
//         builder.addCase(fetchCity.rejected, (state) => {
//             state.cities = null
//         });
//     })
// })


export const locationSelectors = LocationAdapter_District.getSelectors((state: RootState) => state.District);
export const locationCitySelectors = LocationAdapter_City.getSelectors((state: RootState) => state.City);


