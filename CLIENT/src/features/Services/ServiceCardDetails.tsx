import { Avatar, Button, Container, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useEffect } from "react"
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


  return (
    <>
      <Container>
        <Grid container sx={{ marginTop: 2 }}>
          <Grid item xs={6} md={3}>
            <Avatar
              alt={service?.lasttName}
              src={service?.photoUrl}
              sx={{
                width: 200, height: 200,
              }}
              variant="rounded"
            />
          </Grid>
          <Grid item xs={6} md={5} >
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>

                <ListItemText primary={service?.firstName} secondary={service?.lasttName} />
              </ListItem>
              <ListItem>
                <ListItemText primary='SubCategory' />
              </ListItem>
              <Grid>
                <Grid sx={{ display: "inline-block" }}>
                  <ListItem sx={{ p: 0 }}>
                      <ListItemText secondary="July 20, 2014" />
                  </ListItem>
                </Grid>
                <Grid sx={{ display: "inline-block" }}>
                  <ListItem sx={{ p: 0 }}>
                      <ListItemText secondary="July 20, 2014" />
                  </ListItem>
                </Grid>
                <Grid sx={{ display: "inline-block", m: 0, p: 0 }}>
                  <ListItem sx={{ p: 0 }}>
                      <ListItemText secondary="July 20, 2014" />
                  </ListItem>
                </Grid>
                <Grid sx={{ display: "inline-block" }}>
                  <ListItem sx={{ p: 0 }}>
                      <ListItemText secondary="July 20, 2014" />
                  </ListItem>
                </Grid>
              </Grid>
            </List>
          </Grid>
          <Grid item xs={6} md={2}>
            <Button variant="contained">Request </Button>
          </Grid>
          <Grid item xs={6} md={2}>
            <IconButton >
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton >
              <ChatBubbleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container sx={{ marginTop: 2 }}>
          <Grid item xs={6} md={3}>
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
          <Grid item xs={6} md={6} >
            <Typography variant="h5" gutterBottom component="div">
              about
            </Typography>
            <Typography variant="body2" gutterBottom component="div">
            {service?.about}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" gutterBottom component="div">
              skills
            </Typography>
            <Typography variant="body2" gutterBottom component="div">
            {service?.skills}
            </Typography>
          </Grid>
        </Grid>


        <Grid container sx={{ marginTop: 2 }}>
          <Grid item xs={6} md={6} >
            <Typography variant="h6" gutterBottom component="div">
              languages
            </Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="h6" gutterBottom component="div">
              workSummery
            </Typography>
          </Grid>
        </Grid>


      </Container>
    </>
  )
}