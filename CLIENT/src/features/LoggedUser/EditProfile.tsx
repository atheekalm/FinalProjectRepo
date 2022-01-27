import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../test_redux/configureStore"
import { ProfileExits } from "./loggeduserSlice";

export default function EditProfile() {
    const dispatch = useAppDispatch();
    const { id } = useAppSelector(state => state.account);


    return (
        <>
            user can edit profile
        </>
    )
}