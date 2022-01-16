import { ServiceParams } from './../../app/models/User';
import { RootState } from './../test_redux/configureStore';
import { Service } from './../../app/models/Service';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import client_agent from '../../app/api/client_agent';


const serviceAdapter = createEntityAdapter<Service>();

export interface ServiceState {
    servicesLoaded: boolean
    status: string
    UserServiceParams: ServiceParams

}
function getAxiosparams(serviceParams: ServiceParams) {
    const params = new URLSearchParams();
    params.append('PageNumber', serviceParams.PageNumber.toString());
    params.append('PageSize', serviceParams.PageSize.toString());
    if (serviceParams.SearchTearm) params.append('SearchTearm', serviceParams.SearchTearm);
    if (serviceParams.Gender) params.append('Gender', serviceParams.Gender);
    if (serviceParams.Category) params.append('Category', serviceParams.Category);
    if (serviceParams.SubCategory) params.append('SubCategory', serviceParams.SubCategory);
    if (serviceParams.District) params.append('District', serviceParams.District);
    if (serviceParams.City) params.append('City', serviceParams.City);
    if (serviceParams.OrderBy) params.append('OrderBy', serviceParams.OrderBy);
    if (serviceParams.TopRatedServices) params.append('TopRatedServices', serviceParams.TopRatedServices.toString());
    return params;
}
export const fetchServicesAsync = createAsyncThunk<Service[], void, { state: RootState }>(
    'services/fetch',
    async (_, thunkAPI) => {
        const params = getAxiosparams(thunkAPI.getState().services.UserServiceParams)
        try {
            return client_agent.Appservice.services(params);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)
export const fetchServiceAsync = createAsyncThunk<Service, number>(
    'service/fetch',
    async (Serviceid, thunkAPI) => {
        try {
            return client_agent.Appservice.service(Serviceid);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)


function initialServiceParams() {
    return {
        PageNumber: 1,
        PageSize: 10
    }
}

export const serviceSlice = createSlice({
    name: 'Services',
    initialState: serviceAdapter.getInitialState<ServiceState>({
        servicesLoaded: false,
        status: 'idle',
        UserServiceParams: initialServiceParams()

    }),
    reducers: {
        setServiceParams: (state, action) => {
            state.servicesLoaded = false;
            state.UserServiceParams = { ...state.UserServiceParams, ...action.payload };
        },
        resetParams: (state) => {
            state.UserServiceParams = initialServiceParams();
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchServicesAsync.pending, (state) => {
            state.status = 'pendingFetchServices'
        });
        builder.addCase(fetchServicesAsync.fulfilled, (state, action) => {
            serviceAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.servicesLoaded = true
        });
        builder.addCase(fetchServicesAsync.rejected, (state) => {
            state.status = 'idle'
        });
        builder.addCase(fetchServiceAsync.pending, (state) => {
            state.status = 'pendingFetchService'
        });
        builder.addCase(fetchServiceAsync.fulfilled, (state, action) => {
            serviceAdapter.upsertOne(state, action.payload);
            state.status = 'idle'
        });
        builder.addCase(fetchServiceAsync.rejected, (state, action) => {
            state.status = 'idle'
            console.log(action.payload)
        });
    })
})


export const serviceSelectors = serviceAdapter.getSelectors((state: RootState) => state.services);
export const { setServiceParams, resetParams } = serviceSlice.actions;