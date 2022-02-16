import { Avatar, Box, Button, Container, Grid, Paper, Rating, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../test_redux/configureStore";
import { fetchServiceAsync, serviceSelectors } from "./serviceSlice";
import UserPhotoCollection from "./UserPhotoCollection";
import MessageOneDir from "../Chat/MessageOneDir";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




export default function ServiceCardDetails() {
  const { id } = useParams<{ id: string }>();
  const service = useAppSelector(state => serviceSelectors.selectById(state, id))
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!service) dispatch(fetchServiceAsync(parseInt(id)))
  }, [service, dispatch, id])



  // const [images,setImages] = useState<photos>();




  // const [activeStep, setActiveStep] = useState(0);

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleStepChange = (step: number) => {
  //   setActiveStep(step);
  // };

  // const theme = useTheme();


  const [ratingvalue, ratingsetValue] = useState<number | null>(2);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  return (

    <Container>
      <Grid item container >
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
            <Typography component="h1" variant="subtitle1" style={{ padding: 0 }}>
              <Rating name="read-only" style={{ padding: 0, margin: 0 }} value={ratingvalue} readOnly />
            </Typography>
            <Typography component="h1" variant="h5" style={{ padding: 0 }}>
              {service?.firstName} {service?.lasttName}
            </Typography>
            <Typography component="h1" variant="subtitle1" style={{ padding: 0 }}>
              Category - {service?.lasttName}
            </Typography>
            <Typography component="h1" variant="subtitle1" style={{ padding: 0 }}>
              {service?.district} / {service?.city}
            </Typography>
            {/* <Grid container sx={{ alignItems: 'center' }}>
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
                  <Rating name="read-only" value={ratingvalue} readOnly />
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
            </Grid> */}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <Button variant="outlined" sx={{ width: '400px' }}>Send Invitation</Button>
            </Box>
          </Box>
        </Grid>
        <Grid xs={6} md={8}>




























          <Container>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered variant="fullWidth">
                <Tab label="Profile" {...a11yProps(0)} />
                <Tab label="Photos" {...a11yProps(1)} />
                <Tab label="Messages" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Container>
                <Box component={Paper} >
                  <Typography sx={{ margin: 4 }}>
                    <Typography variant="h5">about</Typography>
                    {service?.about}
                  </Typography>
                </Box>
                <Box component={Paper}>
                  <Typography sx={{ margin: 4 }}>
                    <Typography variant="h5">skills</Typography>
                    {service?.skills}
                  </Typography>
                </Box>
                <Box component={Paper}>
                  <Typography sx={{ margin: 4 }}>
                    <Typography variant="h5">education</Typography>
                    {service?.education}
                  </Typography>
                </Box>
                <Box component={Paper}>
                  <Typography sx={{ margin: 4 }}>
                    <Typography variant="h5">workSummery</Typography>
                    {service?.workSummery}
                  </Typography>
                </Box>
              </Container>
            </TabPanel>
            <TabPanel value={value} index={1}>



              <UserPhotoCollection userPhotos={service!?.photos} />



            </TabPanel>
            <TabPanel value={value} index={2}>



              <MessageOneDir />




            </TabPanel>

          </Container>
        </Grid>
      </Grid>
    </Container>





  );
}