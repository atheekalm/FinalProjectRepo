import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Collapse, Grid, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useEffect } from 'react';
import { FetchAllCities, fetchDistrict, locationCitySelectors, locationSelectors } from '../Locations/locationSlice';
import { useAppDispatch, useAppSelector } from '../test_redux/configureStore';
import { City } from '../../app/models/Location';
import { setServiceParams } from './serviceSlice';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function LocationsDetails() {
  const districts = useAppSelector(locationSelectors.selectAll);
  const cities = useAppSelector(locationCitySelectors.selectAll);
  // const { cities } = useAppSelector(state => state.City);
  const dispatch = useAppDispatch();
  const { LocationLoaded } = useAppSelector(state => state.District);
  const { CityLoaded } = useAppSelector(state => state.City);
  console.log(cities);
  const [getCities, setCities] = useState<City[]>([]);
  const [SelectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    if (!LocationLoaded) dispatch(fetchDistrict());
    if (!CityLoaded) dispatch(FetchAllCities());
  }, [LocationLoaded, CityLoaded, dispatch])

  const [openList, setOpenList] = useState(false);

  const handleClick = (districtId: number) => {
    setOpenList(true);
    setCities(cities.filter(ListCity => ListCity.districtId === districtId));
  };
  const SelectCity = (CityName: string) => {
    setOpen(false);
    setSelectedCity(CityName);
    dispatch(setServiceParams({ City: CityName }))

  }
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ListItemButton onClick={handleClickOpen}>
        <ListItemIcon>
          <MyLocationIcon />
        </ListItemIcon>
        <ListItemText primary={SelectedCity || "Locations"} />
      </ListItemButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Locations
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} item={true}>

            <Grid item={true}>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                {districts.map(district => (
                  <ListItemButton
                    key={district.id}
                    onClick={() => handleClick(district.id)}
                    style={{ backgroundColor: 'transparent' }}>
                    <ListItemText primary={district.districtName} />
                    {openList ? <ArrowForwardIosIcon fontSize='small' /> : <ArrowForwardIosIcon fontSize='small' />}
                  </ListItemButton>
                ))}
              </List>
            </Grid>
            <Grid item>
              <Collapse in={openList} timeout="auto" unmountOnExit>
                <List
                  sx={{ marginTop: 0.3 }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  {getCities?.map(city =>
                    <ListItemButton key={city.id} onClick={() => SelectCity(city.citytName)}>
                      <ListItemText primary={city.citytName} />
                    </ListItemButton>
                  )}
                </List>
              </Collapse>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}