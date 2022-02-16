import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Authenticated from '../../features/Account/Authenticated';
import { useAppDispatch, useAppSelector } from '../../features/test_redux/configureStore';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getallMessages } from '../../features/Chat/messageSlice';
import { useEffect } from 'react';
import { ProfileExits } from '../../features/LoggedUser/loggeduserSlice';





export default function Navbar() {
  const theme = useTheme();
  const screenIconMatches = useMediaQuery(theme.breakpoints.down('md'));
  // const screenNavListMatches = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, id } = useAppSelector(state => state.account);
  const dispatch = useAppDispatch();
  const { LoadExist } = useAppSelector(state => state.ProfieExit);

  useEffect(() => {
    if (user?.username != null) dispatch(getallMessages());
    dispatch(ProfileExits(id))
  }, [dispatch, user, id])



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
            Trach
          </Typography>
          {user ? (<Authenticated LoadExist={LoadExist} />
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