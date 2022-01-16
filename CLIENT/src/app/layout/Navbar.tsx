import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Authenticated from '../../features/Account/Authenticated';
import { useAppSelector } from '../../features/test_redux/configureStore';
import { Badge, Button, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Navbar() {
  const { user } = useAppSelector(state => state.account);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component={NavLink} to={'/'} sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Container>

            <Button color="inherit" component={NavLink} to={'/CreateProfile'} variant="outlined" startIcon={<AddCircleOutlineIcon />}>
              Create Profile
            </Button>
            <Badge  color="error" badgeContent={4} showZero component={NavLink} to={'/Messages'}>
                <MailIcon sx={{color:'white'}}/>
            </Badge>
          </Container>
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