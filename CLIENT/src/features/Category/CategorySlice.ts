import { createEntityAdapter, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client_agent from "../../app/api/client_agent";
import { category, subcategory } from "../../app/models/Category";
import { RootState } from "../test_redux/configureStore";






const categoryAdapter = createEntityAdapter<category>();
const subcategoryAdapter= createEntityAdapter<subcategory>();




export const fetchCategories = createAsyncThunk<category[]>(
    'Category/fetch',
    async (_, thunkAPI) => {
        try {
            return client_agent.Category.category();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)


export const fetchsubcategories = createAsyncThunk<subcategory[]>(
    'subcategory/fetch',
    async (_, thunkAPI) => {
        try {
            return client_agent.Category.subcategory();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)



export const categorySlice = createSlice({
    name: 'Category',
    initialState: categoryAdapter.getInitialState({
        categoriesLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.status = 'pendingFetchCategories'
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            categoryAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.categoriesLoaded = true
        });
        builder.addCase(fetchCategories.rejected, (state) => {
            state.status = 'idle'
        });
    })
})

export const subcategorySlice = createSlice({
    name: 'SubCategory',
    initialState: subcategoryAdapter.getInitialState({
        subcategoriesLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchsubcategories.pending, (state) => {
            state.status = 'pendingFetchSubCategories'
        });
        builder.addCase(fetchsubcategories.fulfilled, (state, action) => {
            subcategoryAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.subcategoriesLoaded = true
        });
        builder.addCase(fetchsubcategories.rejected, (state) => {
            state.status = 'idle'
        });
    })
})



export const categoriesSelector = categoryAdapter.getSelectors((state: RootState) => state.Category);
export const subcategoriesSelector = subcategoryAdapter.getSelectors((state: RootState) => state.SubCategory);


