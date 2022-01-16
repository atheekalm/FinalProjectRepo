import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./configureStore";
import { decrement, increment } from "./counterSlice";


export default function Teststore() {
    const dispatch = useAppDispatch();
    const { data, title } = useAppSelector(state => state.counter)
    return (
        <>
            <h1>{title}</h1>
            <h4>{data}</h4>


            <Button onClick={() => dispatch(increment(1))} variant="contained" color="primary">Increment</Button>
            <Button onClick={() => dispatch(decrement(1))} variant="contained" color="error">Decrement</Button>
            <Button onClick={() => dispatch(increment(5))} variant="contained" color="secondary">Increment</Button>

        </>
    )
}