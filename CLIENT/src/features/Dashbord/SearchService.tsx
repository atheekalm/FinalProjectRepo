import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { setServiceParams } from "../Services/serviceSlice";
import { useAppDispatch, useAppSelector } from "../test_redux/configureStore";

export default function SearchService() {
    const dispatch = useAppDispatch();
    const { UserServiceParams } = useAppSelector(state => state.services);
    const [searchTerm, setSearchTerm] = useState(UserServiceParams.SearchTearm);
    const debouncedSearch = debounce((event: any) => {
        dispatch(setServiceParams({ SearchTearm: event.target.value }))
    }, 1000)
    return (
        <>
            <TextField
                label="Search Service"
                variant="outlined"
                fullWidth
                value={searchTerm || ''}
                onChange={(event: any) => {
                    setSearchTerm(event.target.value);
                    debouncedSearch(event);
                }}

            />

        </>
    )
}