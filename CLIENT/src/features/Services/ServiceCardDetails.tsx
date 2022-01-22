import { Avatar, Box, Button, Chip, Container, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Rating, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../test_redux/configureStore";
import { fetchServiceAsync, serviceSelectors } from "./serviceSlice";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CallEndIcon from '@mui/icons-material/CallEnd';

export default function ServiceCardDetails() {
  const { id } = useParams<{ id: string }>();
  const service = useAppSelector(state => serviceSelectors.selectById(state, id))
  const dispatch = useAppDispatch();



  useEffect(() => {
    if (!service) dispatch(fetchServiceAsync(parseInt(id)))
  }, [service, dispatch, id])




  const [value, setValue] = useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  return (
    <>




      <Container>
        <Grid item container>
          <Grid item xs={6} md={4}>
            <Box
              sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar src={service?.photoUrl} sx={{ width: 200, height: 200 }} />
              <Typography component="h1" variant="h5" style={{ padding: 0 }}>
                {service?.firstName} {service?.lasttName}
              </Typography>
              <Typography component="h1" variant="subtitle1" style={{ padding: 0 }}>
                Category - {service?.lasttName}
              </Typography>
              <Typography component="h1" variant="subtitle1" style={{ padding: 0 }}>
                {service?.district} / {service?.city}
              </Typography>
              <Grid container sx={{ alignItems: 'center' }}>
                <Grid xs={4} >
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    hello world
                  </Box>
                </Grid>
                <Grid xs={4} >
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    hello world
                  </Box>
                </Grid>
                <Grid xs={4} >
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    hello world
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid xs={6} md={8}>
            <Container>
              <Box sx={{ width: '100%' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab value="one" label="Item One" ></Tab>
                  <Tab value="two" label="Item Two" />
                  <Tab value="three" label="Item Three" />
                </Tabs>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Container>







      {/* <Container>
        <Grid container item sx={{ marginTop: 2 }}>
          <Grid item >
            <Avatar
              alt={service?.lasttName}
              src={service?.photoUrl}
              sx={{
                width: 200, height: 200,
              }}
              variant="rounded"
            />
            <Box sx={{ mr: '5rem' }} />
          </Grid>
          <Grid item >
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemText primary={service?.firstName} secondary={service?.lasttName} />
              </ListItem>
              <ListItem>
                <ListItemText primary='SubCategory' />
              </ListItem>
              <Grid>
                <Chip sx={{ margin: '0.1rem' }} label="Chip Outlined" variant="outlined" />
                <Chip sx={{ margin: '0.1rem' }} label="Chip Outlined" variant="outlined" />
                <Chip sx={{ margin: '0.1rem' }} label="Chip Outlined" variant="outlined" />
                <Chip sx={{ margin: '0.1rem' }} label="Chip Outlined" variant="outlined" />
              </Grid>
            </List>``
          </Grid>
          <Grid item >
            <Button variant="contained">Request </Button>
          </Grid>
          <Grid item >
            <IconButton >
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton >
              <ChatBubbleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container sx={{ marginTop: 2 }}>
          <Grid item >
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem sx={{ p: 0 }}>
                <ListItemButton >
                  <ListItemIcon>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <ListItemText >{service?.district}/{service?.city}</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <ListItemButton >
                  <ListItemIcon>
                    <MailOutlineIcon />
                  </ListItemIcon>
                  <ListItemText >{service?.email}</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <ListItemButton >
                  <ListItemIcon>
                    <CallEndIcon />
                  </ListItemIcon>
                  <ListItemText >{service?.phone}</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
          <Grid item  >
            <Typography variant="h5" gutterBottom component="div">
              about
            </Typography>
            <Typography variant="body2" gutterBottom component="div">
              {service?.about}
            </Typography>
          </Grid>
          <Grid item >
            <Typography variant="h6" gutterBottom component="div">
              skills
            </Typography>
            <Typography variant="body2" gutterBottom component="div">
              {service?.skills}
            </Typography>
          </Grid>
        </Grid>


        <Grid container sx={{ marginTop: 2 }}>
          <Grid item >
            <Typography variant="h6" gutterBottom component="div">
              languages
            </Typography>
          </Grid>
          <Grid item >
            <Typography variant="h6" gutterBottom component="div">
              workSummery
            </Typography>
          </Grid>
        </Grid>


      </Container> */}
    </>
  )
}