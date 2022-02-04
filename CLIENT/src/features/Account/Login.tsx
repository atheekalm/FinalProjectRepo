import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useHistory } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../test_redux/configureStore';
import { signInUser } from './accountSlice';






const theme = createTheme();

export default function Login() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
    mode: 'all'
  });

  async function submitForm(data: FieldValues) {
    await dispatch(signInUser(data));
    history.push('/');
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="UserName"
              autoFocus
              {...register('Username', { required: 'Username is Required' })}
              error={!!errors.Username}
              helperText={errors?.Username?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register('Password', { required: 'Password is Required' })}
              error={!!errors.Password}
              helperText={errors?.Password?.message}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              disabled={!isValid}
              loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link to='/Register'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


