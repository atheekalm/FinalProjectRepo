import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Authenticated from '../../features/Account/Authenticated';
import { useAppDispatch, useAppSelector } from '../../features/test_redux/configureStore';
import { Badge, Button, Container, useMediaQuery, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getallMessages } from '../../features/Chat/messageSlice';
import { useEffect } from 'react';





export default function Navbar() {
  const theme = useTheme();
  const screenIconMatches = useMediaQuery(theme.breakpoints.down('md'));
  const screenNavListMatches = useMediaQuery(theme.breakpoints.down('sm'));

  const { user } = useAppSelector(state => state.account);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.username != null) dispatch(getallMessages())
  }, [dispatch, user])



  const drawerIcon = (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
    </>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {screenIconMatches ? drawerIcon : null}
          <Typography variant="h6" component={NavLink} to={'/'} sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {user ? (<Authenticated />
          ) : (
            <>
              <Button color="inherit" component={NavLink} to={'/Register'}>Register</Button>
              <Button color="inherit" component={NavLink} to={'/Login'}>Login</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}