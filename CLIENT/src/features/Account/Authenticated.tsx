import { Button, Menu, Fade, MenuItem, Badge } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../test_redux/configureStore";
import MailIcon from '@mui/icons-material/Mail';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { LogOut } from "./accountSlice";
import AccountCircle from '@mui/icons-material/AccountCircle';


interface Props {
    LoadExist: boolean
}

export default function Authenticated({ LoadExist }: Props) {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {LoadExist &&
                <Button color="inherit" component={NavLink} to={'/CreateProfile'} variant="outlined" startIcon={<AddCircleOutlineIcon />}>
                    Create Profile
                </Button>
            }
            <Badge color="error" badgeContent={4} showZero component={NavLink} to={'/Messages'} sx={{ margin: '1rem' }}>
                <MailIcon sx={{ color: 'white', }} />
            </Badge>
            {user?.username}
            <Button
                // color='inherit'
                onClick={handleClick}
                sx={{ typography: 'h6' }}
            >
                <AccountCircle sx={{ color: 'white', }} />
            </Button>


            {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem component={NavLink} to={'/EditProfile'} onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={() => dispatch(LogOut())}>Logout</MenuItem>
            </Menu>
        </>
    );
}